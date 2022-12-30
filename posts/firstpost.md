---
title: RxJS Crash Course
description: This is a introduction about RxJS .
date: 2022-12-15
scheduled: 2022-12-15
tags: JavaScript
layout: layouts/post.njk
---

<!-- summary -->

先打好基礎，再來慢慢深入。

<!-- summary -->

## 附註

來源：https://www.youtube.com/watch?v=PhggNGsSQyg
使用版本：5.5.8

![](https://i.imgur.com/ezTT0xo.png)

## Basic Structure

```typescript
// 建立一個 Observable
const observable = Observable.create((observer: any) => {
  try {
    // 接收一個 observer 物件，這個物件有 next, error, complete 這三個 methods
    observer.next('Hey Guys')
    observer.next('How are you')
    observer.complete()
    // complete 以後的程式碼不會被執行
    observer.next('How are you')
  } catch (error) {
    observer.error(error.message)
  }
})

// 透過 subscribe 來觀察一個 observable（這個觀察的人就稱為 observer）
const observer = observable.subscribe(
  (value: string) => console.log(value), // 接收 next 拋出的值
  (erorr: any) => console.log(value), // 接收 erorr 拋出的值
  () => console.log('Complete') // 當執行到 complete 時觸發
)
```

## Hot & Cold Observable

當一個 Observable 同時被多個 Observer 觀察時，若後來新增的 Observable 觀察到的值是從初始狀態開始，我們會說這個 Observable 是「Cold」的，反之，若觀察到的值是延續原本的 Observable 當下的狀態，這個 Observable 就是「Hot」的。

底下是透過 `share` operator 來建立的 Hot Observable：

```typescript
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'

const observable = Observable.create((observer: any) => {
  try {
    observer.next('Hey Guys')
    observer.next('How are you')

    setInterval(() => {
      observer.next("I'm fine.")
    }, 5000)
  } catch (error) {
    observer.error(error.message)
  }
}).share()

const observer = observable.subscribe((value: string) => addItem(value))

setTimeout(() => {
  console.log('Subscribe2')
  const observer2 = observable.subscribe((value: string) => addItem('Subscribe2: ' + value))
}, 1000)

function addItem(value: string) {
  const ul = document.getElementById('output')
  const li = document.createElement('li')
  const textNode = document.createTextNode(value)
  li.append(textNode)
  ul.append(li)
}
```

這邊只要注意 `observer2` 就好。當 `observer2` 訂閱 `observable` 時，`Hey Guy` 和 `How are you` 這兩個部分都已經是過去式了，所以當它下一次接收到 notify 時，會拿到的值是 `I'm fine`。

這種不會等重頭開始的 `observable` 就是 Hot observable。

> 其他像是透過 fromEvent 來建立的 observable 也是屬於 Hot observable 的一種。

### Subject

可以想成是另一種型態 observable 的，本質還是 observable，但 subject 特別的地方是可以自己設定 `subscribe`、`next` 等操作。

用講的比較抽象一點，直接來看例子：

```typescript
import { Subject } from 'rxjs/Subject'

const subject = new Subject()
subject.subscribe((value: string) => addItem('🚗: ' + value))
subject.next('The first thing emit.')

const observer2 = subject.subscribe((value: string) => addItem('🚌: ' + value))

subject.next('The second thing has been send.')
observer2.unsubscribe()

subject.next('The last thing has been send.')
```

可以看到這邊用 `new Subject()` 生出一個 instance 後，就可以直接透過它來進行 `subscribe`，並且透過 `next` 來 emit 出一個值。這兩個動作都是透過 `subject` **自己**來完成的。

如果是一般的 observable，得先在這個 observable 中定義好要 emit 出去的值：

```typescript
const observable = Observable.create((observer: any) => {
  observer.next('Meow~')
})
```

接著才可以透過 `observable` 來訂閱：

```typescript
observable.subscribe((value: string) => addItem('🐈: ' + value))
```

## 其他型態的 Subject

前面介紹了什麼是 Subject？但是 Subject 其實還可以再細分成不同種類的 Subject，例如：Behavior Subject 和 xxx Subject。

這幾種 Subject 在本質上不會差太多，只是會有一些不同的行為，下面會來介紹。

### Behavior Subject

```typescript
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

const subject = new BehaviorSubject('Init Value')

subject.subscribe((value: string) => addItem('🚗: ' + value))

subject.next('The second thing emit.')
subject.next('Observer2 is about to subscribe...')

const observer2 = subject.subscribe((value: string) => addItem('🚌: ' + value))

observer2.unsubscribe()

subject.next('The last thing has been send.')

function addItem(value: string) {
  const ul = document.getElementById('output')
  const li = document.createElement('li')
  const textNode = document.createTextNode(value)
  li.append(textNode)
  ul.append(li)
}
```

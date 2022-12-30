---
title: TypeScript－各種進階使用的技巧
description: This is a post on My Blog about leveraging agile frameworks.
date: 2018-07-04
scheduled: 2018-07-04
tags: [TypeScript, JavaScript]
layout: layouts/post.njk
---

<!-- summary -->

來一點比較特別的 TypeScript。

<!-- summary -->

## 泛型搭配 extends

### 範例一

```typescript
function getFirstElement<T extends number>(arr: T[]): T {
  const [first] = arr
  return first
}
```

`extends` 在這邊的意思是指「`T` 至少要滿足 `number` 這個 type」，而 `arr` 的 type 是 `T[]`，把兩個組合起來的意思就是：

> 傳入的值必須是「陣列」，且陣列中的元素必須為「number」。

所以用起來會是這樣：

```typescript
getFirstElement([1, 2, 3, 4])
```

如果傳入不是 `number` 的 type 時就會編譯錯誤：

![](https://i.imgur.com/c6slnuY.png)

如果想要讓 `T` 也支援 `string` 的話可以改成這樣子：

```typescript
function getFirstElement<T extends number | string>(arr: T[]): T {
  const [first] = arr
  return first
}
```

這樣的意思就會變成：

> 傳入的值必須是「陣列」，且陣列中的元素必須為「number」或「string」。

所以現在傳入 `string` 陣列的話就不會出錯了：

```typescript
getFirstElement([1, 2, 3, 4]) // corrent ✅
getFirstElement(['A', 'B', 'C']) // corrent ✅
```

### 範例二

假設現在有一個印出名字的 function，長這樣：

```typescript
function logPersonName(person) {
  console.log(`${person.firstName} ${person.lastName}`)
}
```

然而當我們對這個 function 定義 type 時會碰到一個問題，因為通常 `person` 可能會有各式各樣的屬性，像這樣：

```typescript
type Person1 = {
  firstName: string
  lastName: string
  age: number
}

type Person2 = {
  firstName: string
  lastName: string
  gender: number
}
```

所以如果要針對不同的 person 去定義 type 時，就得各別寫一個 function 來處理：

```typescript
// 給 Person1 用的 function
function logPersonName1(person: Person1): void {
  console.log(`${person.firstName} ${person.lastName}`)
}
// 給 Person2 用的 function
function logPersonName2(person: Person2): void {
  console.log(`${person.firstName} ${person.lastName}`)
}
```

看到這邊應該會覺得這是很麻煩的做法吧？所以這時候聰明的你就會想說「阿，我可以用泛型來處理吧！」，接著寫出這樣的東西：

```typescript
function logPersonName<T>(person: T): void {
  console.log(`${person.firstName} ${person.lastName}`)
}
```

然後就會看到這段錯誤訊息：

![](https://i.imgur.com/cFEmCK3.png)

這裡有特別把 `any` 給框起來，是因為這就是主要原因。TS 的意思是說：

> 我知道你給了一個泛型，但是這個泛型的範圍實在是太「廣『泛』了」，因此我無法保證 `firstName` 和 `lastName` 會出現在 person 中。

為了讓 TS 確保 `person` **至少**會有 `firstName` 和 `lastName` 這兩個屬性，我們可以用 `extends` 改寫成這樣子：

```typescript
type Person = {
  firstName: string
  lastName: string
}

// T 至少要出現 Person 中的屬性，所以 person 至少會有 firstName 和 lastName
function logPersonName<T extends Person>(person: T): void {
  console.log(`${person.firstName} ${person.lastName}`)
}
```

這樣子就可以確保 `firstName` 和 `lastName` 存在，但又不會僅限於特定幾個 person 才能使用這個 function 了：

```typescript
// corrent ✅
logPersonName({
  firstName: 'Pea',
  lastName: 'Nu',
  age: 20
})
// corrent ✅
logPersonName({
  firstName: 'Pea',
  lastName: 'Nu',
  gender: 'man'
})
```

### 範例三

如果要對 Type Alias 本身來限制泛型的話，可以這樣做：

```typescript
// 至少要出現的屬性
type BasePerson = {
  firstName: string
  lastName: string
}
// 加上限制的泛型
type GenericPerson<T extends BasePerson> = T
```

現在這個 `GenericPerson` 的用途就是：

> 給我一個 type(T)，我會回傳你一個新的 type。傳進來的 type 可以包含任何屬性，但前提是至少要有 `firstName` 和 `lastName` 屬性，否則不給過。

實際用起來會像這樣：

```typescript
type MyPerson = {
  firstName: string
  lastName: string
  age: 20
  gender: 'man'
}
function logPersonName(person: GenericPerson<MyPerson>): void {
  console.log(`${person.firstName} ${person.lastName}`)
}
```

如果現在把其中一個屬性拿掉的話，就會看到錯誤訊息：

![](https://i.imgur.com/xwQcGKu.png)

這邊會看到兩個錯誤。

第一個是 `person.lastName`，這是因為 `MyPerson` 中並沒有 `lastName`，所以自然不該去存取這個屬性。

第二個是 `GenericPerson<MyPerson>`，因為 `GenericPerson` 中的 `T` 有用 `extends` 來限制傳入的 `T` 至少要有 `firstName` 和 `lastName` 兩個屬性，而 `MyPerson` 中沒有 `lastName`，所以就會出錯。

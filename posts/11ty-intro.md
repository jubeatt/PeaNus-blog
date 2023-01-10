---
title: 給第一次用 eleventy 來架部落格，但不知道該從哪裡開始的人一些建議
description: 如果你也對 eleventy 有興趣，但卻不知道該從何下手的話，也許這篇文章可以帶給你一些想法。
date: 2023-01-10
tags: Eleventy
layout: layouts/post.njk
image: /img/posts/11ty-intro/ogimage.png
---

<!-- summary -->

<!-- 如果你也對 eleventy 有興趣，但卻不知道該從何下手的話，也許這篇文章可以帶給你一些想法。 -->

<!-- summary -->

{% raw %}

## 前言

我開始寫部落格的時間大約是 2021 年左右，當時是透過 [Hexo](https://hexo.io/zh-cn/) 這套 static site generate（底下簡稱 SSG）來架設的，這個網站是 [PeaNu's Paradise](https://jubeatt.github.io/) 。

雖然說是部落格，但點進去看的話會發現其實內容還蠻雜亂的。比起正規的技術部落格，可能更像是我個人的線上筆記 XD。這是因為當時的我還在拼轉職，所以沒有太在意這個問題，部落格對我而言就只是拿來紀錄學習的歷程和練習寫作而已，人氣什麼的從來沒有想過，更不用說拿到業配之類的附加價值了。

但隨著時間過去，我也逐漸有一些新的目標，其中之一就是重新建立一個「專業」的技術部落格。我希望自己也能像其他前輩一樣，透過分享的方式來讓更多人理解某樣東西，同時也加深自己對那項知識的深度。

這就是為什麼我決定重新架一個部落格的原因，而我這次選擇的是 [eleventy](https://www.11ty.dev/)，也是你現在看到的這個網頁。

會寫這篇文章的原因主要是因為自己當初在摸 eleventy 的時候還蠻不清楚該從哪裡開始的，一來是我自認我英文程度沒很好，而 eleventy 在國內的熱度相較於其他的 SSG 來說沒有那麼的高，所以多半時候你能找到的資源都是以英文居多；二來是我覺得跟其他 SSG 比起來，eleventy 需要學習的東西又會再多一些，所以如果沒有方向的話，就會不知道該從何下手。

總而言之，如果你也對 eleventy 這套 SSG 有興趣的話，希望這篇文章可以帶給你一些想法。當然，我不保證你看完後就能馬上學會怎麼用 eleventy 來架部落格，但至少你會有一點方向，知道自己該往哪裡開始下手。

## 幾件想特別先提醒的事

1. 雖然這篇文章是想教你如何用 eleventy 建立自己的部落格，但不會是手把手從頭帶你做的那種 tutorial，而是比較偏向引導性質，我只會告訴你該從哪邊開始下手，以及能參考哪些資源。
2. 如果你對 SSG（static site generate）的運作方式完全沒有概念，或你是第一次聽到這個詞的人，那 eleventy 可能不是一個很好的選擇，因為要付出的時間、學習成本可能會太多。這種情況下我會建議先從 hexo 這套比較好入門的 SSG 開始。
3. 如果你只想要開箱即用的部落格，不想多花時間去寫 JS 和 CSS，一樣建議左轉 hexo，那會是比較輕鬆的選擇。

看到這邊可能會覺得這傢伙是怎樣，才剛開始就一直在勸退不要用 eleventy，去用 hexo，搞什麼？？？

其實說這些的用意只是想先打個預防針，我當初第一次聽到 eleventy 時也是馬上就想跳過去用看看，所以就抱著就像架 hexo 一樣的心態去接觸 eleventy，不過馬上就碰壁了。因為 eleventy 的特色不是開箱及用，而是豐富的客製化「彈性」，代表有很多東西是你要自己去調整的。

雖然 eleventy 確實也有提供各種 [start project](https://www.11ty.dev/docs/starter/)，但多半都需要你再去做調整才能達到你滿意的樣子。說個笑話，我當時沒研究多久就放棄回去繼續用 hexo 了。

以你目前看到的這個部落格來說，大概花了我 4、5 天的時間才架好。如果你問我「eleventy 好用嗎？」，我會回答「Good！我很滿意，eleventy 確實是一套很不錯的 SSG」，但是對於剛架部落格的新手來說，我也真的覺得不是那麼好入門就是了，所以才會建議先做好準備後再開始會比較好。

## eleventy 需要學習哪些東西？

就像寫 React 之前，你必須先知道基本的 JavaScript 一樣，寫 eleventy（以下簡稱 11ty） 也有一些需要具備的知識，這邊針對幾個比較主要的項目做說明。

### 模板引擎

不管你是用市面上哪一套 SSG（例如：hexo、hugo 等），大多都會搭配模板引擎來處理渲染畫面的邏輯，不然會非常麻煩。想像一下現在有一個文章列表的頁面，如果不使用模板引擎的話你只能像下面這樣子 hardcode：

```html
<body>
  <ul>
    <li>文章一</li>
    <li>文章二</li>
    <li>文章三</li>
    <li>文章四</li>
    <li>文章五</li>
    <li>...</li>
  </ul>
</body>
```

但如果用模板引擎的話，我們就可以透過「資料」來驅動渲染，以 [Nunjucks](https://mozilla.github.io/nunjucks/) 來舉例的話會像這樣：

```html
<ul>
  {% for post in postslist %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

在模板引擎中我們只要餵給它資料（`postslist`），再搭配迴圈就可以渲染出 `li` 了。

這樣對照起來你會想用哪一種方式來處理？應該沒意外都是第二種吧，不然每次新增一篇文章我就要去手動更新 HTML 也太麻煩了。

當然，也是有比較特別的案例，例如 [Gatsby](https://www.gatsbyjs.com/)（另外一套 SSG）就不使用模板引擎，而是用大家熟悉的 React 來作為渲染畫面的工具。但這不是這篇要討論的主題，有興趣的人可以自行到官網去研究看看。

所以說，使用 11ty 也必須對模板引擎有一些基本的概念。以 11ty 來說目前比較常見的兩套是 [Nunjucks](https://mozilla.github.io/nunjucks/) 或 [Liquid](https://shopify.github.io/liquid/)。至於要學哪一套？其實都可以，因為基本上概念都可以互通（迴圈、判斷式等等），所以不用在這個地方太糾結，你學會 A 以後 B 也差不多會用了。

> 那...需要學到多精深呢？

這邊讓我爆個雷，從我開始用 11ty 來架部落格的這段期間，我完全沒有特地花時間去學該怎麼用這些模板引擎，更沒有去背它們的語法，大部分都是要用到的時候才去查「官方文件」看我想要的東西該怎麼用而已。

所以不用擔心會花很多時間，只要你有基本的程式基礎就夠用了，我也不鼓勵去鑽研到很精深，因為真的沒有必要。

因此在模板引擎的部分，我推薦只要去參考模板引擎的官方文件就好了，這邊舉兩個：

- [Nunjucks 官方文件](https://mozilla.github.io/nunjucks/api.html)
- [Liquid 官方文件](https://shopify.github.io/liquid/)

### eleventy 的主要架構與運作方式

接下來會是比較複雜一點的部分。首先要知道基本上大部分 SSG（包含 eleventy）的運作流程都是這樣：

![work-flow](/img/posts/11ty-intro/work-flow.png)

以架部落格的需求來說，你大概需要學的東西會有這幾個：

- 怎麼用模板引擎來拼 layout，知道怎麼用它來組合出每一個不同的區塊。
- Front matter（markdown 最上面的 `---` 區塊） 中的資訊怎麼跟 11ty 和模板引擎串起來
- 理解 11ty 的 Collection 是什麼，如何添加自己的 Collection
- 理解 11ty 的 Config 可以調的設定有哪些
- 理解 11ty 的 Pagination 如何設定

這邊主要都圍繞在跟 11ty 本身有關的一些項目，但我不打算在這邊教你每一樣該如何處理，一來是篇幅會很長，二來是我覺得有其他更有效率的做法，所以我會分享我當初是怎麼學這些東西的。

首先我第一個先參考的是 11ty 相關的課程：[Eleventy Crash Course](https://www.youtube.com/watch?v=uzM5lETc6Sg&list=PLtLXFsdHI8JTwScHvB924dY3PNwNJjjuW)，這一部我覺得很不錯的地方是他是「從頭開始」帶你建立一個 11ty 的專案，所以你可以很清楚知道每一步是怎麼走的，而且也把一些基本概念給說明清楚了，像是：

- 模板引擎的一些基本操作（我對模板引擎的理解基本上就跟這影片教的差不多，個人覺得比較需要花時間去理解的部分是 `block` 和 `extends` 的功能）
- 11ty 的 Config 配置（讀取靜態檔案，`watch` 指定檔案等等）
- 11ty 的 Collection 功能（可以知道怎麼把文章列表變成一個 collection 給模板引擎使用）
- 11ty 的 Shortcode 功能（類似 React 元件的功能）
- 與 Front matter 的相關解說（在模板引擎中使用的資料大多是從這裡取得的）

這裡也附上我當初看這部影片時做的筆記：[11ty-Notes](https://jubeatt.github.io/2023/01/09/11ty-note/#%E5%83%8F%E5%85%83%E4%BB%B6%E4%B8%80%E6%A8%A3%E7%9A%84-Shortcode)，可以搭配影片來參考。

雖然整個影片的時間大約是 2 小時，不長但也不短，但我覺得先理解一些概念後再去從官方文件下手會比較有方向一點（至少我是這樣子）。

看完影片後，接著就是開始爬文件的時間了。舉例來說，如果你想知道怎麼在模板引擎裡添加自定義的「Filter」，那就可以從文件裡查到 [Filter](https://www.11ty.dev/docs/filters/) 相關的段落；想知道怎麼做分頁的話，就去文件裡面找到 [Pagination](https://www.11ty.dev/docs/pagination/) 的段落，基本上都是這樣子而已。

善用 `ctrl + f` 來從文件中搜尋出你要的關鍵字，再不然就是直接用 google 來搜尋 `功能 + eleventy`，我相信基本上都能找到你要的答案的。

來總結一下，底下差不多就是我架這個部落格時採用的學習方式：

1. 先挑一個簡短的教學課程，理解 11ty 基本上是怎麼運作的
2. 查官方文件，從修改和側試的過程中學習

聽起來我也沒真的做很多事吧？只是難就難要讓自己真的理解每一個環節是什麼，而不是只是 copy & paste 而已，這樣子往後碰到問題還是不知道該怎麼解決。

雖然這邊提供的資源不多，但我覺得都有告訴你應該要知道的東西有哪些，所以如果覺得這邊的資源太少，歡迎利用上面的關鍵字去搜尋你想要的答案。

## 我自己在架這個部落格時碰到了哪些問題？

如果你有看過這篇文章：[除了 hexo，也可以考慮用 eleventy 來寫技術部落格](https://blog.huli.tw/2021/08/22/eleventy-over-hexo/)，應該就會覺得現在這個頁面的版型很熟悉。沒錯，這邊也是採用 [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 這個模板來當作 start template 的。

順便感謝一下那篇文章的作者 [Huli](https://blog.huli.tw/)，我自己在開發途中碰到的很多問題都是從他提供的 [原始碼](https://github.com/Lidemy/error-baker-blog) 中找到答案的，真的十分感謝。

如果你也是用 eleventy-high-performance-blog 這個模板的話，主要會碰到的問題裡面都有提到了，但我再多提幾個我自己遇到的問題。

### 修改標題「#」的渲染位置

就是上面 👆 這個標題的「#」位置，預設是在字尾，這邊想移到字首的位置。

這個設定可以在 [這裡](https://github.com/jubeatt/PeaNus-blog/blob/main/.eleventy.js#L192) 找到：

```javascript
/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: 'direct-link',
  permalinkSymbol: '#',
  permalinkBefore: true // 👈 調整為 true
})
```

### 我的 code block 中包含 nunjucks 語法

想像一下如果你在寫文章時，code block 剛好要呈現一段 nunjucks 的程式碼片段：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

如果你直接這樣子寫的話，當 11ty 碰到 `{{ content | safe }}` 時，會真的去把他當成 nunjucks 來解析，然後就出現錯誤了。

老實說我當初在 google 時一直找不到有人碰到類似的問題，有可能是我下的關鍵字不好，也有可能真的沒人討論到這些。總之，後來問了這陣子很夯的 [Chat GPT](https://openai.com/blog/chatgpt/) 以後，得到的解答是你可以這樣處理：

![escape](/img/posts/11ty-intro/escape.png)

把整個「\`\`\`」 的部分用`raw ... endraw` 來包住，這樣子 `{}`就會被當作純文字來處理，不會被當成 nunjucks 來解析了。

### 沒用到的 class 自動被清掉

這是在寫深色主題的時候碰到的問題。一般在我們會透過根元素上的 `class` 來當作切換主題的 flag，所以可能就會寫出類似這樣的 css：

```css
body {
  background: black;
  color: white;
}

body.light {
  background: white;
  color: black;
}
```

然而實際在用的時候會碰到**明明已經用 JS 加上對應的 `class` 卻沒有反應的問題**。

這是因為這套模板中使用了 [Purgecss](https://purgecss.com/)，它的其中一項功能就是會把**沒用到的 class 給清掉**。而問題出在一開始的 `body` 沒有用到 `light` 這個 class，所以就直接被當成沒用的 class 給清掉了 QQ

接著爬了一下 Purgecss 的官方文件找到了 [這段](https://purgecss.com/safelisting.html)，裡面告訴我們可以傳入相關的 config 來做調整，這邊是使用 `safelist` 來處理：

```javascript
const purged = await new PurgeCSS().purge({
  content: [
    {
      raw: rawContent,
      extension: 'html'
    }
  ],
  css: [
    {
      raw: before
    }
  ],
  /*extractors: [
    {
      extractor: require("purge-from-html").extract,
      extensions: ["html"],
    },
  ],*/
  fontFace: true,
  variables: true,
  safelist: ['light', 'open'] // 👈 加入 safelist
})
```

只要是出現在 `safelist` 中的 class，就算沒有實際使用也不會被清除，所以就能解決剛剛的問題了。

### 自訂字體有時候能載入，有時候不行？

這個直接看圖可能比較好理解：

![font-problem](/img/posts/11ty-intro/font-problem.gif)

可以看到 Peanu 的部分一下有套用字型，一下沒有的問題。

起初我以為是字體載入不正常的關係而引起的，但後來檢查確定字體是有正常載入的，所以疑惑了一段時間。

後來發現一樣是這個模板在設定優化時出的問題，所以到裡面研究了一下，發現 `optimize-html.js` 中有一段跟 `font-family` 相關的 [處理](https://github.com/google/eleventy-high-performance-blog/blob/main/_11ty/optimize-html.js#L52-L55)：

```javascript
const purifyCss = async (rawContent, outputPath) => {
  let content = rawContent
  if (
   // ...
  ) {
    let before = require('fs').readFileSync('css/main.css', {
      encoding: 'utf-8'
    })

    // 這一行 👇
    before = before.replace(/@font-face {/g, '@font-face {font-display:optional;')

    // ...
  }
  return content
}
```

這行的用途是幫所有 `@font-face` 加上 `font-display:optional` 的設定。

所以試著把這行註解掉做測試，果然就沒有再出現前面的問題了，不過原因是什麼？

爬了一下 `font-display` 的用法，看到了 [這篇文章](https://www.astralweb.com.tw/use-font-display-to-improve-and-optimize-website/) 寫得還蠻清楚的，推薦有空可以花個幾分鐘讀一下順便學點新知識，這邊直接截錄文章對 `font-display:optional` 的說明：

> 此值會自行判定是否要加載使用者的自定義字型，取決於使用用戶的網路環境，對於網速過慢、收訊較差的使用者來說相當合適，可以省去不必要的下載時間並順利地檢視內容。

簡單來說，有可能是網路問題而引起的，不過個人認為我在部落格使用的字體檔案並不多，應該不太需要對這部分做處理，所以我還是拿掉這個 feature 了。

如果你是對網站的載入速度很講究的人，建議還是留著比較好。

### 使用 GIF 圖片時會編譯失敗

如果你在某篇文章中用了 GIF 圖片，編譯的時候就會噴錯。

一樣是跟優化有關的問題，這個模板會把 GIF 圖片轉成 video 格式來輸出（因為 video 的容量比較小），但是似乎有一些 [bug](https://github.com/google/eleventy-high-performance-blog/issues/75)，所以目前的做法是直接把 GIF 處理的部分給拿掉，讓他直接用原始格式輸出：

![remove-gif-code](/img/posts/11ty-intro/remove-gif-code.png)

註：這是 `_11ty/img-dim.js` 的內容，紅色框框是我額外做的處理。會突然用圖片表示是因為 GitHub 不支援多行 highlight 的功能。（題外話：這個需求從 2015 年就有人[提出](https://github.com/isaacs/github/issues/453)，至今還是沒有消息 😆）

### 執行 inline script

如果直接在 nunjucks 模板中插入 `script` 來寫 JavaScript 的話會發現沒辦法執行，也會在 console 裡看到 CSP 的錯誤訊息

[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是一個避免 XSS 攻擊的防護策略，這個模板預設有開啟這個功能，所以才會擋掉 inline script。老實說我對 CSP 也沒有很熟，但至少以我們的部落格來說應該是不需要擔心 CSP 的問題，所以一樣把這個功能 [拿掉](https://github.com/jubeatt/PeaNus-blog/blob/main/.eleventy.js#L80) 就好了。

### 幫連結加上 target 屬性

這個模板的連結（即，`<a>` 標籤）預設沒有帶上 `target: '_blank'` 的屬性，但我個人比較偏好用「新分頁」的方式來開啟，所以這邊要多下載一個套件是 [markdown-it-link-attributes](https://github.com/crookedneighbor/markdown-it-link-attributes)，接著修改ㄧ下 [.eleventy.js](https://github.com/jubeatt/PeaNus-blog/blob/main/.eleventy.js#L196-L204) 的內容就可以了。

```javascript
let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
    permalinkBefore: true
  })
  // 加上下面這一段 👇
  .use(mila, {
    matcher(href, config) {
      return href.startsWith('https:')
    },
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  })
```

## 結語

蠻久沒有像這樣很認真的去寫一篇文章了，果然寫文章還是一件很耗時和燒腦的事情，就算我自認我打字速度不算慢，但是腦中沒有句子的話好像也沒有意義 QQ

接著來稍微講一下架完部落格心得好了。

我覺得剛開始接觸 eleventy 的時候真的還蠻多問題的，但還是要讚美一下官方文件其實是真的算寫得不錯，至少常見的需求都有幫你收錄在裡面了，只是如果跟我一樣沒那麼機靈的話可能要稍微翻一下才會找到自己要的東西。

這段過程雖然比較繁瑣了一些，但正好可以運用自己擅長的前端技術來解決想要的問題，回頭想想其實也是蠻不錯的，學到了蠻多東西，感覺有更暸解怎麼善用文件和 Github Issue 來到正確解答。

還順便學習了一下幾乎很少碰到的 SEO，好在這個模板有預先處理好一些比較麻煩的地方，所以其實我主要做的也只是把 `og:` 屬性配置得更完整而已。雖然我對 SEO 真的很陌生，但至少先試著去做做看，希望至少能在 Google 上查到自己的部落格吧。（先偷偷許個願

最後還是要說一下，誠心希望看完這篇文章的人有一些收穫，如果看完後你感覺比較有想法了，知道該從哪下手了，這樣子就太棒啦！

我覺得學習前先有一個明確的方向是很重要的事情，不然很多時候我們會不知道該往哪走，或甚至是走錯路，學了一堆東西後也不知道會了以後可以做什麼，其實真的還蠻可惜的。

當然，如果你看完後還是有一些疑惑，想直接詢問我細節的話，你可以寄 email 或是底下留言，也可以直接加我的 [Discord](https://discordapp.com/users/PeaNu#7349)。

{% endraw %}

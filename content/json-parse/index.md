---
emoji: ๐
title: JSON.parse์ ํจ์ 
date: '2022-09-11 23:00:00'
author: aaron
tags: json javascript
categories: ๊ฐ๋ฐ
---

![](https://statuscode.space/200.jpg)
**Photo by STATUSCODE.SPACE**

<br />
<br />

๊ฐ๋ฐ์ ํ๋ค๋ณด๋ฉด json ํํ์ ๋ฐ์ดํฐ๋ฅผ ์ฃผ๊ณ ๋ฐ์์ผ ํ๋ ๊ฒฝ์ฐ๊ฐ ์์ฃผ ๋ง์ต๋๋ค. ์ผ๋ฐ์ ์ผ๋ก http ์์ฒญ์ ํตํด ๋ฐ์ดํฐ๋ฅผ ์ฃผ๊ณ  ๋ฐ์๋๊ฐ ์๊ณ ,
์ ์ ๊ฒฝ์ฐ์๋ `PostMessage` API๋ฅผ ํตํด ์๋ก ๋ค๋ฅธ frame ์ฌ์ด์ ๋ฐ์ดํฐ๋ ์ํ๋ฅผ ์ฃผ๊ณ ๋ฐ๋ ๊ฒฝ์ฐ์ `BrowserStorage` ์ ์ ์ฅ๋ ๊ฐ์ ๊ฐ์ ธ์ค๋ ๊ฒฝํ์ ๋ง์ด ํ์ต๋๋ค. ์ ๊ฒฝ์ฐ์ ๋ชจ๋ ์ ๋ฌ๋ฐ์ json ๋ฐ์ดํฐ๋ฅผ javascript `Object`๋ก ๋ณํํด ์ฃผ์ด์ผ ์ฌ์ฉ ๊ฐ๋ฅํ๋ฐ, ์ด ๋ ์ฝ๊ฒ ๋์น๊ฒ ๋๋ ๋ถ๋ถ์ด ์์ต๋๋ค.

<br />
<br />

### JSON.parse

Javascript์ ๋ด์ฅ ๊ฐ์ฒด์ธ `JSON` ๊ฐ์ฒด์๋ `parse` ๋ฉ์๋๊ฐ ์กด์ฌํฉ๋๋ค. `JSON.parse`์ ์ญํ ์ json ํ์์ ๋ฐ์ดํฐ๋ฅผ Javascript์์ ์ฌ์ฉ ๊ฐ๋ฅํ `Object`๋ก ๋ณํํด ์ฃผ๋๋ฐ, **์ฒซ๋ฒ์งธ ์ธ์๋ก string ํ์์ ๋ฐ์ต๋๋ค.** ๋๋ฒ์งธ ์ธ์์ธ reviver์ ๊ดํด์๋ ์ฌ๊ธฐ์ ๋ค๋ฃจ์ง ์๊ฒ ์ต๋๋ค.

```typescript
const json: string = '{"like": "gecko", "age": 27}';
const parsedJson = JSON.parse(json);
console.log(parsedJson);
```

_๐response_

```typescript
{
	like: "gecko",
	age: 27,
}
```

์์๊ฐ์ด Javascript์์ ์ฆ์ ํ์ฉ ๊ฐ๋ฅํ Object ํํ๋ฅผ ๋ฐํ ํฉ๋๋ค. ์ฐธ๊ณ ๋ก ์ฌ๊ธฐ์ ๋งํ๋ `Object`์๋ ์๋์ ๊ฐ์ ๊ฒฝ์ฐ๋ ํฌํจ๋์ด ์์ต๋๋ค.

```typescript
JSON.parse('{}'); // {}
JSON.parse('true'); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('123'); // 123
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null'); // null
```

<br />
<br />

### Syntax Error ๐

`JSON.parse`๊ฐ ์ฃผ๋ก ์ฌ์ฉ๋๋ ์ฌ์ฉ์ฒ๋ค์ ํน์ฑ์ parsing ๋์์ธ ์ฒซ๋ฒ์งธ ์ธ์์ string type์ด ๋ฐ๋์ ๋ณด์ฅ๋์ง ์๋ ๊ฒฝ์ฐ๊ฐ ๋ง์ต๋๋ค.
server์์ ๋ถํฐ ๋ฐ๋ ์๋ต์ด๋ `PostMessage`,`WebviewBridge` ํน์ `BrowserStorage`์ ๊ฒฝ์ฐ ๋คํธ์ํฌ ์ํ, ๊ธฐ๊ธฐ์ ์ํ ๋ฑ... ๋งค์ฐ ๋ง์ ์ด์ ๋ก ์ธํด ์ํ์ง ์๋ ๊ฐ์ด return ๋  ๊ฐ๋ฅ์ฑ์ด ๋ง์ต๋๋ค.

```typescript
const json = localstorage.getItem('notExistValue'); // ''
const parsedValue = JSON.parse(json as string);
console.log(parsedValue);
```

_๐response_

```
Uncaught SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at <anonymous>:1:6
```

<br />
<br />

![](./spongebob_error.jpeg)

ํด๋น ์๋ฌ๊ฐ ๋ฐ์ํ๋ฉด ์ฐ๋ฆฌ์ ์ ํ๋ฆฌ์ผ์ด์์ ๋ฐ๋ก ์ฃฝ์ด๋ฒ๋ฆฝ๋๋ค.

<br />
<br />

### Error Handling

์ด๋ฌํ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํ์ฌ **์ฐ๋ฆฌ์ ์๋น์ค๊ฐ ์๋ ์ธ๋ถ์ ์๋น์ค, ํน์ ์ฌ์ฉ์๊ฐ ๋ณํํ  ์ ์๋ ๋ฐ์ดํฐ ๋ฑ์ ๊ฐ์ ธ์ parsingํ  ๋**์๋ Error Handling์ด ๋ฐ๋์ ํ์ํฉ๋๋ค.

```typescript
try {
  JSON.parse(json);
} catch (err) {
  // something...
}
```

์์๊ฐ์ด **try/catch** ๋ฌธ๋ฒ์ ํตํด ์๋น์ค์ ์ค์ง๋ฅผ ๋ฐฉ์งํ  ์ ์์ต๋๋ค. ๋ค๋ง ๋ชจ๋  ์ฌ์ฉ์ฒ์์ **try/catch** ์ฒ๋ฆฌ๋ฅผ ํ๊ธฐ์๋ ์ฝ๋์ ๋ณต์ก๋๊ฐ ์ฌ๋ผ๊ฐ ์ ์์ผ๋ฏ๋ก, custom hook ๋๋ util function์ผ๋ก ๋ง๋ค์ด ์ฌ์ฉํ  ์ ์๋๋ก ํ๋ฉด ์ข์๊ฒ ๊ฐ์ต๋๋ค.

```toc

```

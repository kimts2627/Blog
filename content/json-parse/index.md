---
emoji: 💀
title: JSON.parse의 함정
date: '2022-09-11 23:00:00'
author: aaron
tags: json javascript
categories: 개발
---

![](https://statuscode.space/200.jpg)
**Photo by STATUSCODE.SPACE**

<br />
<br />

개발을 하다보면 json 형태의 데이터를 주고받아야 하는 경우가 아주 많습니다. 일반적으로 http 요청을 통해 데이터를 주고 받을때가 있고,
저의 경우에는 `PostMessage` API를 통해 서로 다른 frame 사이에 데이터나 상태를 주고받는 경우와 `BrowserStorage` 에 저장된 값을 가져오는 경험을 많이 했습니다. 위 경우에 모두 전달받은 json 데이터를 javascript `Object`로 변환해 주어야 사용 가능한데, 이 때 쉽게 놓치게 되는 부분이 있습니다.

<br />
<br />

### JSON.parse

Javascript의 내장 객체인 `JSON` 객체에는 `parse` 메서드가 존재합니다. `JSON.parse`의 역할은 json 형식의 데이터를 Javascript에서 사용 가능한 `Object`로 변환해 주는데, **첫번째 인자로 string 타입을 받습니다.** 두번째 인자인 reviver에 관해서는 여기서 다루지 않겠습니다.

```typescript
const json: string = '{"like": "gecko", "age": 27}';
const parsedJson = JSON.parse(json);
console.log(parsedJson);
```

_👇response_

```typescript
{
	like: "gecko",
	age: 27,
}
```

위와같이 Javascript에서 즉시 활용 가능한 Object 형태를 반환 합니다. 참고로 여기서 말하는 `Object`에는 아래와 같은 경우도 포함되어 있습니다.

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

### Syntax Error 💀

`JSON.parse`가 주로 사용되는 사용처들의 특성상 parsing 대상인 첫번째 인자의 string type이 반드시 보장되지 않는 경우가 많습니다.
server에서 부터 받는 응답이나 `PostMessage`,`WebviewBridge` 혹은 `BrowserStorage`의 경우 네트워크 상태, 기기의 상태 등... 매우 많은 이유로 인해 원하지 않는 값이 return 될 가능성이 많습니다.

```typescript
const json = localstorage.getItem('notExistValue'); // ''
const parsedValue = JSON.parse(json as string);
console.log(parsedValue);
```

_👇response_

```
Uncaught SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at <anonymous>:1:6
```

<br />
<br />

![](./spongebob_error.jpeg)

해당 에러가 발생하면 우리의 애플리케이션은 바로 죽어버립니다.

<br />
<br />

### Error Handling

이러한 문제를 해결하기 위하여 **우리의 서비스가 아닌 외부의 서비스, 혹은 사용자가 변형할 수 있는 데이터 등을 가져와 parsing할 때**에는 Error Handling이 반드시 필요합니다.

```typescript
try {
  JSON.parse(json);
} catch (err) {
  // something...
}
```

위와같이 **try/catch** 문법을 통해 서비스의 중지를 방지할 수 있습니다. 다만 모든 사용처에서 **try/catch** 처리를 하기에는 코드의 복잡도가 올라갈 수 있으므로, custom hook 또는 util function으로 만들어 사용할 수 있도록 하면 좋을것 같습니다.

```toc

```

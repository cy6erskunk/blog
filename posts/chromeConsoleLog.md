----
title: Chrome console.log bullshit explained
posturl: chrome console.log
date:   2013-08-06
----
Несколько раз сталкивался с тем, что `console.log(var)` в Chrome DevTools показывает что-то странное. Что-то вроде:

```javascript
var arr = [0, 1, 2];
for (var i=0; i<arr.length; i++) {
    arr[i] = -1;
    console.log(arr);
}
```
выдает не
```javascript
[-1, 1, 2]
[-1, -1, 2]
[-1, -1, -1]
```
а
```javascript
3 [-1, -1, -1]
```

Память подсказывает, что происходит это из-за того, что `console.log` работает асинхронно, объекты в него передаются по ссылке.

Сегодня опять зашла речь об этом поведении, и, немного поискав и пройдя через несколько десятков дубликатов, удалось найти соответствующую задачу в трэкере Chrome:
[Issue 50316:   Console.log gives incorrect output in Chrome Developer Tools console](https://code.google.com/p/chromium/issues/detail?id=50316)

Задача была закрыта в августе 2012 года, причем с некоторыми особенностями ([#30](https://code.google.com/p/chromium/issues/detail?id=50316#c30)):
**при открытом DevTools** Chrome создает «мгновенный снимок» объекта на момент логгирования, который включает в себя 5 свойств для объекта и 100 элементов для массива, этот снимок рендерится с примененнием наклонного шрифта. При попадании в лог сложных объектов (напр. `window`), Chrome отрисует снимок наклонным шрифтом, но при открытии сложного объекта будет показано его состояние на момент открытия его в консоли, а не на момент логгирования ([картинка в трэкере](https://chromium.googlecode.com/issues/attachment?aid=503160030001&name=Screen+shot+2012-08-10+at+11.10.42+AM.png&token=1khKL6wDKondsPabqyr0ANcTW_g%3A1375775441107&inline=1&thumb=1)).

При закрытом DevTools сохраняется старое, не всегда ожидаемое, поведение.



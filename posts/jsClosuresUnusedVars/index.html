{
    title: 'JavaScript closures memory optimization - unused variables',
    date:   '2013-08-22',
    posturl: 'JS Closures Memory Optimization'
}

Есть интересная особенность у Chrome и Firefox (возможно, в других браузерах тоже): переменные из родительского контекста, которые не используются в функции, выпиливаются из замыкания. То есть, если в следующем коде:

```javascript
(function () {
    var foo = 'foo';
    (function () {
        var bar = 1; // <-- put breakpoint on this line
    })();
})();

```

поставить breakpoint на строке, где объявляется `bar`, и в момент остановки попробовать получить значение `foo`, то мы получим `ReferenceError: foo is not defined`. При этом, следующий код прекрасно отработает, как следовало ожидать:
```javascript
(function () {
    var foo = 'foo';
    (function () {
        var bar = 1; // <-- put breakpoint on this line
        console.log(foo);
    })();
})();
```
и `foo` вполне себе бует доступна во вложенной функции.

Делается это, по всей видимости, для того, чтобы не захламлять память ненужными данными. И никаких проблем вызывать не должно, но, как оказалось, может приводить к неожиданностям при дебаггинге.

Наблюдали это поведение в Chromium 25 и Firefox 22, но, если верить [StackOverflow](http://stackoverflow.com/questions/15801471/deeper-understanding-of-closure-in-javascript), эта оптимизация уже есть в Firefox 18.

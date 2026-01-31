# Cloning and transforming state

## The guideline

**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**

## Опис завдання:

Напишіть функцію `transformStateWithClones`, яка приймає об'єкт `state` та масив `actions`,
застосовує кожну дію до попереднього `state` для обчислення наступного стану,
та повертає масив зі станами, отриманими після кожної дії.

Кожна `action` - це об'єкт, що описує зміни `state`. Залежно від значення її властивості `type` ви повинні зробити наступне:
- `clear` - створити порожній об'єкт стану;
- `addProperties` - додати всі пари `key: value`, надані у властивості `extraData`, до нового `state`;
- `removeProperties` - видалити всі ключі, надані в масиві `keysToRemove`, зі `state`. (ігнорувати неіснуючі)

**ВАЖЛИВО!** НЕ модифікуйте початковий об'єкт `state` будь-яким чином!

Example 1:

```js
const state = {
  foo: 'bar',
  bar: 'foo',
};

const stateHistory = transformStateWithClones(state, [
  {
    type: 'addProperties',
    extraData: { name: 'Jim', hello: 'world' },
  },
  {
    type: 'removeProperties',
    keysToRemove: ['bar', 'hello'],
  },
  {
    type: 'addProperties',
    extraData: { another: 'one' },
  },
]);

console.log(stateHistory);
// [
//   { foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world' },
//   { foo: 'bar', name: 'Jim' },
//   { foo: 'bar', name: 'Jim', another: 'one' },
// ]
```

Example 2:

```js
const state = {
  foo: 'bar',
  bar: 'foo',
};

const stateHistory = transformStateWithClones(state, [
  {
    type: 'addProperties',
    extraData: { yet: 'another property' },
  }
  { type: 'clear' },
  {
    type: 'addProperties',
    extraData: { foo: 'bar', name: 'Jim' },
  },
]);

console.log(stateHistory);
// [
//   { foo: 'bar', bar: 'foo', yet: 'another property' },
//   {},
//   { foo: 'bar', name: 'Jim' },
// ]
```

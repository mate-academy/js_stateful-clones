# Cloning and transforming state

**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**

# Task description

Write a function `transformStateWithClones` that take a `state` object and an `actions` array
and return an array of the same length as `actions` containing all previous versions of the `state`.
Each element of the resulting array has to represent the state produced by the next operation.

**IMPORTANT!** You must not modify the initial `state` object in any way!

- `state` is an initial object. It should always remain the same.

- `actions` is an array of objects. Each object in this array has the next properties:
  - `type` contains a string: either `'addProperties'`, `'removeProperties'` or `'clear'`;
  - The second property of each object depends on `type` and may be one of the following:
    - if `type` is `addProperties`, the second property is `extraData`. It contains an object
      with `key: value` pairs to add to the state;
    - if `type` is `removeProperties`, the second property is `keysToRemove`. It contains an array
      with the list of property names (keys) to remove from the `state`; (Not existing
      properties should be ignored)
    - if `type` is `clear` you should create an empty state object. No second property in this case;

Example of usage:

If `state` is {foo: 'bar', bar: 'foo'}, then

```
transformStateWithClones(state, [
  {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
  {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
  {type: 'addProperties', extraData: {another: 'one'}}
])
```

must return the following array:

```
[
  {foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world'},
  {foo: 'bar', name: 'Jim'},
  {foo: 'bar', name: 'Jim', another: 'one'}
].
```

**The `state` object itself should not be modified and must remain {foo: 'bar', bar: 'foo'}.**

Then after calling

```
transformStateWithClones(state, [
  {type: 'addProperties', extraData: {yet: 'another property'}}
  {type: 'clear'},
  {type: 'addProperties', extraData: {foo: 'bar', name: 'Jim'}}
])
```

we must get

```
[
  {foo: 'bar', bar: 'foo', yet: 'another property'},
  {},
  {foo: 'bar', name: 'Jim'}
].
```
the `state` variable must still contain
{foo: 'bar', bar: 'foo'}.

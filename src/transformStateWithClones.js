'use strict';

/**
 * Implement a function accepting 2 arguments `state` and `transforms` and
 * returning an array of states of the same length as `transforms`. Each
 * element of the resulting array has to represent the state produced by the
 * next operation.
 *
 * You must not reassign `state` to a new object or modify it in any way!
 *
 * `state` is an initial object.
 *
 * `transforms` is an array of objects having the following properties:
 * `operation`: either `addProperties`, `removeProperties` or `clear`;
 * `properties`:
 *   - if `operation` is `addProperties`, this property contains an object
 *   with `key: value` pairs to add to the state;
 *   - if `operation` is `removeProperties`, this property contains an array
 *   with the list of property names to remove from the state; (Not existing
 *   properties should be ignored)
 *   - if `operation is `clear` you should create an empty state object
 *
 * Sample usage:
 *
 * If `state` is {foo: 'bar', bar: 'foo'}, then
 *
 * transformStateWithClones(state, [
 *   {operation: 'addProperties', properties: {name: 'Jim', hello: 'world'}},
 *   {operation: 'removeProperties', properties: ['bar', 'hello']},
 *   {operation: 'addProperties', properties: {another: 'one'}}
 * ])
 *
 * must return
 * [
 *   {foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world'},
 *   {foo: 'bar', name: 'Jim'},
 *   {foo: 'bar', name: 'Jim', another: 'one'}
 * ].
 *
 * The `state` object itself should not be modified and must remain
 * {foo: 'bar', bar: 'foo'}.
 *
 * Then after calling
 *
 * transformStateWithClones(state, [
 *   {operation: 'addProperties', properties: {yet: 'another property'}}
 *   {operation: 'clear'},
 *   {operation: 'addProperties', properties: {foo: 'bar', name: 'Jim'}}
 * ])
 *
 * we must get
 * [
 *   {foo: 'bar', bar: 'foo', yet: 'another property'},
 *   {},
 *   {foo: 'bar', name: 'Jim'}
 * ].
 *
 * the `state` variable must still contain
 * {foo: 'bar', bar: 'foo'}.
 *
 *
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  // write code here

  const copyCat = {
    ...state,
  };
  const array = [];

  for (const obj of transforms) {
    if (obj.operation === 'addProperties') {
      add(obj.properties);
    };

    if (obj.operation === 'removeProperties') {
      remove(obj.properties);
    };

    if (obj.operation === 'clear') {
      clear();
    };
  };
  // FUNCTIONS
  // ADD

  function add(properties) {
    const arrayCopy = array.slice();
    let lastObjectOfArray = arrayCopy[arrayCopy.length - 1];

    if (arrayCopy.length === 0) {
      lastObjectOfArray = {
        ...copyCat,
      };
    };

    const addedObject = Object.assign({}, lastObjectOfArray, properties);

    array.push(addedObject);
  };
  // REMOVE

  function remove(properties) {
    const arrayCopy = array.slice();

    if (arrayCopy.length === 0) {
      arrayCopy.push(Object.assign({}, copyCat));
    };

    const lastObjectOfArray = arrayCopy[arrayCopy.length - 1];
    const copyLastObjectOfArray = {
      ...lastObjectOfArray,
    };

    for (const value of properties) {
      if (copyLastObjectOfArray.hasOwnProperty(value)) {
        delete copyLastObjectOfArray[value];
      };
    };

    array.push(copyLastObjectOfArray);
  };
  // CLEAR

  function clear() {
    array.push({});
  };

  return array;
};

module.exports = transformStateWithClones;

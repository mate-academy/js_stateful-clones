'use strict';

/**
 * Implement a function that transforms a state while keeping a history of
 * states:
 *
 * The first parameter your function accepts, `state`, is an object with the
 * initial state. You must not reassign `state` to a new object or modify it
 * in any way.
 *
 * The second parameter your function accepts, `transforms`, is an array of
 * objects having the following properties:
 * `operation`: either `addProperties`, `removeProperties`, or `clear`;
 * `properties`:
 *   if `operation` is `addProperties`, this property contains an object
 *   with `key: value` pairs to add to the state;
 *   if `operation` is `removeProperties`, this property contains an array
 *   with the list of property names to remove from the state;
 *   if `operation is `clear`, this property is not set; you should remove
 *   all the properties from the state instead.
 *
 * You may assume that all transformations are valid (e.g., there will be no
 * request to remove a non-existent property).
 *
 * Your function must return an array of states of the same length as the input
 * list of operations. Each element of the resulting array has to represent
 * the state that the corresponding operation had produced.
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
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const result = [];
  const cloneObj = Object.assign({}, state);

  for (const value of transforms) {
    switch (value.operation) {
      case 'addProperties':
        Object.assign(cloneObj, value.properties);
        break;
      case 'removeProperties':
        for (const key of value.properties) {
          delete cloneObj[key];
        }
        break;
      case 'clear':
        for (const key in cloneObj) {
          delete cloneObj[key];
        }
        break;
    }
    result.push(Object.assign({}, cloneObj));
  }

  return result;
}

module.exports = transformStateWithClones;

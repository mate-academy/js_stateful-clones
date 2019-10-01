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
  // write code here
  const arr = [];
  let clonedObj = Object.assign({}, state);
  for (const elem of transforms) {
    const { operation, properties } = elem;
    if (operation === 'addProperties') {
      clonedObj = addPropertiesToObject(clonedObj, properties);
    }
    if (operation === 'removeProperties') {
      clonedObj = removePropertiesFromObject(clonedObj, properties);
    }
    if (operation === 'clear') {
      clonedObj = clearObject(clonedObj);
    }
    arr.push(Object.assign({}, clonedObj));
  }
  return arr;
}

function addPropertiesToObject(object, properties) {
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      object[key] = properties[key];
    }
  }
  return object;
}

function removePropertiesFromObject(object, properties) {
  for (const elem of properties) {
    delete object[elem];
  }
  return object;
}

function clearObject(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      delete object[key];
    }
  }
  return object;
}

module.exports = transformStateWithClones;

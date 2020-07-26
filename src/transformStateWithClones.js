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
  for (let i = 0; i < transforms.length; i++) {
    const arrTransforms = [];
    let cloneState = Object.assign({}, state);

    for (const key in transforms) {
      switch (transforms[key].operation) {
        case 'addProperties':
          cloneState = Object.assign(cloneState, transforms[key].properties);
          arrTransforms.push(Object.assign({}, cloneState));
          break;

        case 'removeProperties':
          for (const iterator of transforms[key].properties) {
            delete cloneState[iterator];
          }
          arrTransforms.push(Object.assign({}, cloneState));
          break;

        case 'clear':
          for (const iterator1 of Object.keys(cloneState)) {
            delete cloneState[iterator1];
          }
          arrTransforms.push(Object.assign({}, cloneState));
          break;
      }
    }

    return arrTransforms;
  }
}

module.exports = transformStateWithClones;

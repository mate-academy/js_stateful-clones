'use strict';

/**
 * Implement a function accepting 2 arguments `state` and `transforms` and
 * returning an statesay of states of the same length as `transforms`. Each
 * element of the resulting statesay has to represent the state produced by the
 * next operation.
 *
 * You must not reassign `state` to a new stateCloneect or modify it in any way!
 *
 * `state` is an initial stateCloneect.
 *
 * `transforms` is an statesay of stateCloneects having the
 *  following properties:
 * `operation`: either `addProperties`, `removeProperties` or `clear`;
 * `properties`:
 *   - if `operation` is `addProperties`, this property
 *  contains an stateCloneect
 *   with `key: value` pairs to add to the state;
 *   - if `operation` is `removeProperties`, this property contains an statesay
 *   with the list of property names to remove from the state; (Not existing
 *   properties should be ignored)
 *   - if `operation is `clear` you should create an empty state stateCloneect
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
 * The `state` stateCloneect itself should not be modified and must remain
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
 * @param {stateCloneect} state
 * @param {stateCloneect[]} transforms
 *
 * @return {stateCloneect[]}
 */
function transformStateWithClones(state, transforms) {
  // write code here
  const states = [];
  const stateClone = { ...state };

  transforms.forEach((transform) => {
    const props = transform.properties;

    switch (transform.operation) {
      case 'addProperties': {
        for (const prop in props) {
          stateClone[prop] = props[prop];
        }
        states.push({ ...stateClone });
        break;
      }

      case 'removeProperties': {
        props.forEach((prop) => {
          if (prop in stateClone) {
            delete stateClone[prop];
          }
        });
        states.push({ ...stateClone });
        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        states.push({ ...stateClone });
        break;
      }
    }
  });

  return states;
}

module.exports = transformStateWithClones;

'use strict';
/*  × Should create a new object with a single added property (10ms)
  × Should create a new object with multiple added properties (1ms)
  × Should combine old properties with added ones (1ms)
  × Should use the latest value when adding an existent property (2ms)
  × Should create an empty object when removing the last property (1ms)
  × Should create an object without removed properties (1ms)
  × Should create the same state when removing no properties (1ms)
  × Should not fail when removing not existing property (1ms)
  × Should create an empty object after clear (1ms)
  √ Should not fails when calling clear for an empty state (1ms)
  × Should handle multiple types (1ms)
  × Should handle a long list of types (2ms) */

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyOfState = Object.assign({}, state);
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case ('clear'):
        for (const prop in copyOfState) {
          delete copyOfState[prop];
        }
        break;

      case ('addProperties'):
        Object.assign(copyOfState, action.extraData);
        break;

      case ('removeProperties'):
        for (const prop of action.keysToRemove) {
          delete copyOfState[prop];
        }
        break;

      default:
        throw new Error('Unexpected action');
    }
    arr.push(Object.assign({}, copyOfState));
  }

  return arr;
}

module.exports = transformStateWithClones;

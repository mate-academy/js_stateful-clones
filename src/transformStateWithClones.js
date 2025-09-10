'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
  function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // clone initial state

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // clone before mutation
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        // ignore unknown action types
        break;
    }

    result.push({ ...currentState }); // push a clone of the new state
  }

  return result;
}


module.exports = transformStateWithClones;

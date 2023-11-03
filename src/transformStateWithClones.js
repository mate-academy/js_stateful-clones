'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        newState = { ...currentState };
        break;
      case 'removeProperties':
        newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        currentState = { ...newState };
        break;
      case 'clear':
        currentState = {};
        newState = { ...currentState };
        break;
      default:
        newState = { ...currentState };
    }
    results.push(newState);
  }

  return results;
}

module.exports = transformStateWithClones;

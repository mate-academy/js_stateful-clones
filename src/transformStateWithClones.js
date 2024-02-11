'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const result = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        if (action.extraData) {
          currentState = {
            ...currentState, ...action.extraData,
          };
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          for (const keyToRemove of action.keysToRemove) {
            delete currentState[keyToRemove];
          }
        }
        break;
      default:
        // Do nothing for unknown action types
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        const extra =
          action &&
          typeof action.extraData === 'object' &&
          action.extraData !== null &&
          !Array.isArray(action.extraData)
            ? action.extraData
            : {};

        newState = { ...currentState, ...extra };
        break;

      case 'removeProperties':
        for (const keyToRemove of Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : []) {
          delete newState[keyToRemove];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

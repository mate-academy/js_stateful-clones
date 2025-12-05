'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        result.push({ ...currentState });

        break;

      case 'addProperties':
        for (const newKey in action.extraData) {
          currentState[newKey] = action.extraData[newKey];
        }

        result.push({ ...currentState });

        break;

      case 'removeProperties':
        for (const keysRemove of action.keysToRemove) {
          delete currentState[keysRemove];
        }
        result.push({ ...currentState });
        break;
      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

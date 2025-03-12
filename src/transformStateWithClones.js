'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };

        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const toRemove of action.keysToRemove) {
          delete currentState[toRemove];
        }

        break;

      case 'clear':
        currentState = {};

        break;

      default:
        return null;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

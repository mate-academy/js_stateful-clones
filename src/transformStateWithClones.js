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
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        continue;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

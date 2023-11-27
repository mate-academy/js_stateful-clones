'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        result.push({ ...currentState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          currentState = { ...currentState };
          delete currentState[key];
        }
        result.push({ ...currentState });
        break;
      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

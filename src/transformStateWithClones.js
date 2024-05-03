'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        result.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        result.push({ ...newState });
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

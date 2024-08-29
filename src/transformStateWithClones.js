'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        for (const rem of action.keysToRemove) {
          delete tempState[rem];
        }
        break;

      case 'clear': {
        for (const key in tempState) {
          delete tempState[key];
        }
        break;
      }

      default:
        break;
    }

    statesHistory.push({ ...tempState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

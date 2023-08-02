'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistoryArray = [];
  const stateHistory = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        for (const key in actions[i].extraData) {
          stateHistory[key] = actions[i].extraData[key];
        }

        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete stateHistory[key];
        }

        break;
      }

      case 'clear': {
        for (const key in stateHistory) {
          delete stateHistory[key];
        }
        break;
      }

      default: {
        throw new Error('ERROR');
      }
    }

    stateHistoryArray.push({ ...stateHistory });
  }

  return stateHistoryArray;
}

module.exports = transformStateWithClones;

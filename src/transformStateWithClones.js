'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistoryArray = [];
  let stateHistory = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateHistory, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateHistory[key];
        }

        break;
      }

      case 'clear': {
        stateHistory = {};
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

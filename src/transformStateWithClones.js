'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let CURRENT_STATE = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        CURRENT_STATE = {};
        break;

      case 'addProperties':
        CURRENT_STATE = {
          ...CURRENT_STATE,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in CURRENT_STATE) {
            delete CURRENT_STATE[keyToRemove];
          }
        }
        break;
      default:
        break;
    }
    stateHistory.push({ ...CURRENT_STATE });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

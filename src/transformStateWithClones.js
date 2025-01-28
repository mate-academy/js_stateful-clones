'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(newState, extraData);
        stateHistory.push({ ...newState });
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete newState[key];
        }
        stateHistory.push({ ...newState });
        break;
      }

      default: {
        for (const key in newState) {
          delete newState[key];
        }
        stateHistory.push({ ...newState });
        break;
      }
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

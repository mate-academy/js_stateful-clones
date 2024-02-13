'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = {
        ...newState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete newState[key]);
    }

    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

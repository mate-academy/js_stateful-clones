'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      statesHistory.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      statesHistory.push({ ...newState });
    }

    if (action.type === 'clear') {
      newState = {};
      statesHistory.push({ ...newState });
    }
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

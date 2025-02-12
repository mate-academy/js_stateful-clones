'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };
      action.keysToRemove.forEach((key) => delete currentState[key]);
    }
    statesHistory.push({ ...currentState });
  });

  return statesHistory;
}

module.exports = transformStateWithClones;

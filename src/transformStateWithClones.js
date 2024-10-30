'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    let updatedState = { ...currentState };

    if (action.type === 'addProperties') {
      updatedState = { ...updatedState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete updatedState[key]);
    } else if (action.type === 'clear') {
      updatedState = {};
    }

    stateHistory.push(updatedState);
    currentState = updatedState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  actions.forEach(action => {
    let newState = { ...currentState };

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => {
        delete newState[key];
      });
    }

    stateHistory.push(newState);
    currentState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

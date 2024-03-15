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

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      action.keysToRemove.forEach(key => {
        delete currentState[key];
      });
    } else if (action.type === 'clear') {
      currentState = {};
    }
    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

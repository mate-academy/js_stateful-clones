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
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        break;
      case 'removeProperties':
        currentState = { ...currentState };
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

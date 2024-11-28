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

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
      default:
        break;
    }
    stateHistory.push({ ...newState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

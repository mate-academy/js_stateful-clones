'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  actions.forEach((action) => {
    let newState = { ...copyState };

    switch (action.type) {
      case 'clear':
        Object.keys(newState).forEach((key) => {
          delete newState[key];
        });
        break;
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      default:
        break;
    }

    stateHistory.push(newState);
    copyState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

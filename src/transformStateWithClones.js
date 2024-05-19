'use strict';

/**
 * @param {Object} initialState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let copyState = { ...initialState };

  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...copyState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = { ...copyState };
        action.keysToRemove.forEach((key) => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;
      default:
        newState = { ...copyState };
        break;
    }

    stateHistory.push(newState);
    copyState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

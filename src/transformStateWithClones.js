'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  let newState = {};
  const historyState = [];

  actions.forEach((action) => {
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
        newState = copyState;
        break;
    }

    historyState.push(newState);
    copyState = newState;
  });

  return historyState;
}

module.exports = transformStateWithClones;

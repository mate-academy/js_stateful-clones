'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const value of action.keysToRemove) {
          delete newState[value];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }
    statesHistory.push({ ...newState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

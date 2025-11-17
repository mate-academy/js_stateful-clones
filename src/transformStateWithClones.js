'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let clonedState = { ...state };

  for (const action of actions) {
    clonedState = { ...clonedState };

    switch (action.type) {
      case 'addProperties':
        clonedState = { ...clonedState, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;
      case 'clear':
        clonedState = {};
        break;

      default:
        break;
    }

    stateHistory.push(clonedState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

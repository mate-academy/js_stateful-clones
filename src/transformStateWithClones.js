'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let previousState = { ...state };

  for (const action of actions) {
    const { type } = action;

    let newState = { ...previousState };

    switch (type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        continue;
    }

    stateHistory.push(newState);
    previousState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

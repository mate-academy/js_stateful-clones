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
  let prevState = { ...state };

  for (const action of actions) {
    let newState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
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
        break;
    }
    prevState = newState;
    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

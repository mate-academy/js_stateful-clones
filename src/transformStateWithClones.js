'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const item in action.extraData) {
          copyOfState[item] = action.extraData[item];
        }
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copyOfState[item];
        }
        break;

      case 'clear':
        for (const item in copyOfState) {
          delete copyOfState[item];
        }
        break;

      default:
        throw new Error('Something went wrong!');
    }
    stateHistory.push({ ...copyOfState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

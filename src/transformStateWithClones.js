'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let curState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        curState = { ...curState, ...action.extraData };
        break;

      case 'removeProperties':
        curState = { ...curState };

        for (const key of action.keysToRemove) {
          delete curState[key];
        }
        break;

      case 'clear':
        curState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push({ ...curState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

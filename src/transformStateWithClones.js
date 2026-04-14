'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let stateRequest = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateRequest = { ...stateRequest, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateRequest[key];
        }
        break;
      case 'clear':
        stateRequest = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...stateRequest });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        newState = { ...newState, ...act.extraData };
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: '${act.type}'`);
    }

    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

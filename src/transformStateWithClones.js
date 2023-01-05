'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        };
        break;

      default:
        throw new Error('unknown action');
    }
    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

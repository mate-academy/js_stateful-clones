'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  const actualState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(actualState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete actualState[key];
        }
        break;

      case 'clear':
        for (const key in actualState) {
          delete actualState[key];
        }
        break;

      default:
        throw new Error('Error: unknown action type');
    }
    statesHistory.push({ ...actualState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

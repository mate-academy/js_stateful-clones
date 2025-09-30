'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newStateHistory = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'addProperties':
        Object.assign(newState, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        break;
    }
    newStateHistory.push({ ...newState });
  }

  return newStateHistory;
}

module.exports = transformStateWithClones;

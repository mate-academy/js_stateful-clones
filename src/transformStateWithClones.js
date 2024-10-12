'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copiedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copiedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        copiedState = {};
        break;

      default:
        return state;
    }

    stateHistory.push({ ...copiedState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

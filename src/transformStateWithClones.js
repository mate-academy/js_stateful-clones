'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        copyState = Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          if (copyState.hasOwnProperty(keyToRemove)) {
            delete copyState[keyToRemove];
          }
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        return;
    }
    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

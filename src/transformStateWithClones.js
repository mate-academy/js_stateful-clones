'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
  const stateHistory = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(modifiedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;
    }

    stateHistory.push({ ...modifiedState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          if (copy.hasOwnProperty(keyToRemove)) {
            delete copy[keyToRemove];
          }
        }
        break;
      case 'clear':
        for (const deletedKey in copy) {
          delete copy[deletedKey];
        }
        break;
    }
    stateHistory.push({ ...copy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const cloneHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
    }

    cloneHistory.push({ ...clone });
  }

  return cloneHistory;
}

module.exports = transformStateWithClones;

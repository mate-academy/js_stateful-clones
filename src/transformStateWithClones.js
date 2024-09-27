'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case `addProperties`:
        Object.assign(stateCopy, extraData);
        break;

      case `removeProperties`:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case `clear`:
        stateCopy = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

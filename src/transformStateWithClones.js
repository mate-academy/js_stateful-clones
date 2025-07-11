'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (keysToRemove.length > 0) {
            delete stateCopy[key];
          }
        }
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        stateHistory.push({ ...{} });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

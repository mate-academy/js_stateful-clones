'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (let q = 0; q < keysToRemove.length; q++) {
          delete stateCopy[keysToRemove[q]];
        }
        break;
      case 'clear':
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

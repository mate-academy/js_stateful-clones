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
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const newState = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        stateCopy = newState;
        break;
      }

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // add all extraData props to the state
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties': {
        // remove all keysToRemove from the state
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case 'clear': {
        // remove all state keys from it
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;
      }

      default: {
        throw new Error('Unknown action type');
      }
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

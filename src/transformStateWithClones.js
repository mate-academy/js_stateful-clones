'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy;

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...currentState };
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(stateCopy);
    currentState = stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

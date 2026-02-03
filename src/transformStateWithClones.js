'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push(stateCopy);
    currentState = stateCopy;
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

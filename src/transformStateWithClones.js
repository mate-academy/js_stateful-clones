'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyStates = [];
  let currentState = { ...state };

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;

      case 'clear':
        currentState = {};
        historyStates.push(currentState);
        continue;

      default:
        throw new Error('Unknown action type');
    }

    currentState = stateCopy;
    historyStates.push(stateCopy);
  }

  return historyStates;
}

module.exports = transformStateWithClones;

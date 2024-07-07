'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  let currentState = { ...state };

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        currentState = stateCopy;
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

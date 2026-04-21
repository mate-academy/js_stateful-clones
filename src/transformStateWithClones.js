'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const filteredState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete filteredState[key];
        }

        currentState = filteredState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    const stateCopy = { ...currentState };

    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

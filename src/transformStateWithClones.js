'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        const keysToRemove = new Set(action.keysToRemove || []);
        const nextState = {};

        for (const key of Object.keys(currentState)) {
          if (!keysToRemove.has(key)) {
            nextState[key] = currentState[key];
          }
        }
        currentState = nextState;
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = {};

  for (const key in state) {
    newState[key] = state[key];
  }

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete newState[keysToRemove];
        }
        break;

      default: return `Unknown action type ${action.type}`;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

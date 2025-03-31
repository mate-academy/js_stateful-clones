'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`:
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        console.warn(`Unknown action type: ${action.type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

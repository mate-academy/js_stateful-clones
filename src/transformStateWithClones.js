'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        currentState = nextState;
        break;

      default:
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

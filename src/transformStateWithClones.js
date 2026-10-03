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
    let nextState;
    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        nextState = { ...currentState, ...(action.extraData || {}) };
        break;
      case 'removeProperties':
        nextState = { ...currentState };
        for (const key of action.keysToRemove || []) {
          delete nextState[key];
        }
        break;
      default:
        nextState = { ...currentState };
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }
  return result;
}

module.exports = transformStateWithClones;

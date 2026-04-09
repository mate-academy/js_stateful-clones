'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let currentState = { ...state };

  for (const action of actions) {
    const nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'clear':
        for (const key in nextState) {
          delete nextState[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    newState.push(nextState);
    currentState = nextState;
  }

  return newState;
}

module.exports = transformStateWithClones;

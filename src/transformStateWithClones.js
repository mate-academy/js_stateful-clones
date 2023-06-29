'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(proper => {
          delete newState[proper];
        });
        break;
      case 'clear':
        Object.keys(newState).forEach(proper => {
          delete newState[proper];
        });
        break;
      default:
        return (`Unknown action type: ${action.type}`);
    }

    stateClones.push(newState);
    currentState = newState;
  }

  return stateClones;
}

module.exports = transformStateWithClones;

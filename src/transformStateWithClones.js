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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        for (let j = 0; j < action.keysToRemove.length; j++) {
          delete newState[action.keysToRemove[j]];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;

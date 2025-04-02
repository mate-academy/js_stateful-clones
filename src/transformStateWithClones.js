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
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      default:
        break;
    }

    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;

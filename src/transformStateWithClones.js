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

  for (const action of actions) {
    let newState = {};

    switch (action.type) {
      case 'addProperties':
        newState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = { ...currentState };
        break;
    }
    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;

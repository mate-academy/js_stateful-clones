'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        newState = { ...newState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;

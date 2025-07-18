'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...previousState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...previousState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...newState });
    previousState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;

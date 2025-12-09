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
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...previousState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...previousState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(nextState);
    previousState = nextState;
  }

  return states;
}

module.exports = transformStateWithClones;

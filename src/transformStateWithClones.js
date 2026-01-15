'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          nextState[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }

        break;

      case 'clear':
        nextState = {};

        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;

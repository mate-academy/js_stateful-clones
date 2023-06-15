'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            if (nextState.hasOwnProperty(key)) {
              delete nextState[key];
            }
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        // Handle unknown action types, if needed
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;

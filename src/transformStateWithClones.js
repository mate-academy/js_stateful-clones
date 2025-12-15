'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'clear':
        nextState = {};
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      default:
        break;
    }
    currentState = nextState;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;

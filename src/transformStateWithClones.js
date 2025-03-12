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
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...currentState };
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

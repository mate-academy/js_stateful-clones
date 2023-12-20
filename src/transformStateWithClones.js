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
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(newState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          for (const keyToRemove of action.keysToRemove) {
            delete newState[keyToRemove];
          }
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

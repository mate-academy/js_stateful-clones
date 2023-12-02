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
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(newState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        newState = {};
        break;
    }

    result.push(newState);

    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

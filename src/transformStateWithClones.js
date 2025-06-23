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
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const keys in action.extraData) {
          newState[keys] = action.extraData[keys];
        }
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete newState[keys];
        }
        break;

      case 'clear':
        for (const keys in currentState) {
          delete newState[keys];
        }
        break;
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

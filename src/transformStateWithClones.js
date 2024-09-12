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
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    result.push(newState);
    currentState = { ...newState };
  }

  return result;
}

module.exports = transformStateWithClones;

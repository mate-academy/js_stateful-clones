'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const extraData = action.extraData || {};
        const stateCopy = { ...currentState, ...extraData };

        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const keysToRemove = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];
        const stateCopy = { ...currentState };

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default:
        break;
    }

    statesHistory.push({ ...currentState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

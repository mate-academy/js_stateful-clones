'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const transformedStates = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties': {
        Object.assign(newState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          if (newState[key]) {
            delete newState[key];
          }
        }
        break;
      }

      case 'clear': {
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }

    transformedStates.push({ ...newState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;

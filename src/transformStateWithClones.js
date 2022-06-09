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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(currentState, extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete currentState[key];
        }

        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default: {
        break;
      }
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

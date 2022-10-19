'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
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

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;

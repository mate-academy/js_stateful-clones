'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        for (const key in extraData) {
          newState[key] = extraData[key];
        }

        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;
      }

      case 'clear': {
        for (const element in newState) {
          delete newState[element];
        }

        break;
      }
    }

    arrayOfStates.push({ ...newState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const resultArray = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        if (extraData) {
          Object.assign(currentState, extraData);
        }
        break;

      case 'removeProperties':
        if (keysToRemove) {
          for (const key of keysToRemove) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    resultArray.push({ ...currentState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;

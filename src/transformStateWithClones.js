'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalArray = [];
  const temporaryState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          temporaryState[key] = action.extraData[key];
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporaryState[key];
        }
        break;

      case 'clear':
        for (const key in temporaryState) {
          delete temporaryState[key];
        }
        break;

      default:
        document.getElementById('errorMessage').innerHTML = 'Error';
    }
    finalArray.push({ ...temporaryState });
  }

  return finalArray;
}

module.exports = transformStateWithClones;

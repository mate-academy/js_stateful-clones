'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;

      case 'clear':
        for (const keyState in stateClone) {
          delete stateClone[keyState];
        }
        break;

      default:
        console.log('Incorrect operation');
    }

    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;

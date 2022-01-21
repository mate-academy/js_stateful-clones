'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const clonedObject = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          newState[key] = extraData[key];
        }

        clonedObject.push({ ...newState });
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }

        clonedObject.push({ ...newState });
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        clonedObject.push({});
        break;
      default:
        break;
    }
  }

  return clonedObject;
}

module.exports = transformStateWithClones;

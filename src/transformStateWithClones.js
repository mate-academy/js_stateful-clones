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
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        throw Error('Unknown action');
    }
    clonedObject.push({ ...newState });
  }

  return clonedObject;
}

module.exports = transformStateWithClones;

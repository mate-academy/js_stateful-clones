'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here

  const stateCopy = { ...state };
  const resultObjects = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`You gave wrong object properties`);
    }
    resultObjects.push({ ...stateCopy });
  }

  return resultObjects;
}

module.exports = transformStateWithClones;

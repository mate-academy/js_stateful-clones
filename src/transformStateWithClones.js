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
        resultObjects.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        resultObjects.push({ ...stateCopy });
        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        resultObjects.push({ ...stateCopy });
        break;

      default:
        throw new Error(`You gave wrong object properties`);
    }
  }

  return resultObjects;
}

module.exports = transformStateWithClones;

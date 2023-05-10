'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    if (obj.type === 'clear') {
      for (const stateKey in stateCopy) {
        if (stateKey) {
          delete stateCopy[stateKey];
        }
      }

      const clearedCopy = { ...stateCopy };

      arrayOfStates.push(clearedCopy);
    }

    if (obj.type === 'addProperties') {
      Object.assign(stateCopy, obj.extraData);

      const addedCopy = { ...stateCopy };

      arrayOfStates.push(addedCopy);
    }

    if (obj.type === 'removeProperties') {
      for (const keyToRemove of obj.keysToRemove) {
        delete stateCopy[keyToRemove];
      }

      const removedCopy = { ...stateCopy };

      arrayOfStates.push(removedCopy);
    }
  }

  return arrayOfStates;
}
module.exports = transformStateWithClones;

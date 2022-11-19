'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayOfStates = [];

  for (const action of actions) {
    const temporaryCopyObject = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        Object.assign(temporaryCopyObject, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        }

        for (const removeKey of action.keysToRemove) {
          delete temporaryCopyObject[removeKey];
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }

        for (const property in temporaryCopyObject) {
          delete temporaryCopyObject[property];
        }
        break;

      default:
        break;
    }
    arrayOfStates.push(temporaryCopyObject);
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;

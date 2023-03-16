'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const stateCopy = {
    ...state,
  };

  actions.forEach(object => {
    switch (object.type) {
      case 'addProperties':
        for (const key in object.extraData) {
          stateCopy[key] = object.extraData[key];
        }

        arrayOfStates.push({
          ...stateCopy,
        });
        break;
      case 'removeProperties':
        object.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });

        arrayOfStates.push({
          ...stateCopy,
        });
        break;

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        arrayOfStates.push({
          ...stateCopy,
        });
    }
  });

  return arrayOfStates;
}

module.exports = transformStateWithClones;

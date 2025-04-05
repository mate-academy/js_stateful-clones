'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyArray = [];
  const stateCopy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        if (object.extraData) {
          Object.assign(stateCopy, object.extraData);
        }
        break;

      case 'removeProperties':
        if (object.keysToRemove) {
          for (const key of object.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;

      default:
        break;
    }

    stateCopyArray.push({ ...stateCopy });
  }

  return stateCopyArray;
}

module.exports = transformStateWithClones;

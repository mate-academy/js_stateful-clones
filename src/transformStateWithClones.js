'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedObjects = [];
  const stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);

        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });

        break;

      case 'clear':
        Object.keys(stateCopy).forEach(key => {
          delete stateCopy[key];
        });

        break;

      default:
        throw new Error('Unknown Action');
    }

    modifiedObjects.push({ ...stateCopy });
  }

  return modifiedObjects;
}

module.exports = transformStateWithClones;

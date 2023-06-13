'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedObjects = [];

  for (const action of actions) {
    let stateCopy;

    if (modifiedObjects.length === 0) {
      stateCopy = { ...state };
    } else {
      const lastModified = modifiedObjects[modifiedObjects.length - 1];

      stateCopy = { ...lastModified };
    }

    const actionType = action.type;

    switch (actionType) {
      case 'addProperties':
        const extraData = action.extraData;

        Object.assign(stateCopy, extraData);

        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });

        break;

      case 'clear':
        const stateKeys = Object.keys(stateCopy);

        stateKeys.forEach(key => {
          delete stateCopy[key];
        });

        break;

      default:
        break;
    }

    modifiedObjects.push(stateCopy);
  }

  return modifiedObjects;
}

module.exports = transformStateWithClones;

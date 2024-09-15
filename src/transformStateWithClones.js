'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const modifiedObjects = [];
  const typeValueAdd = 'addProperties';
  const typeValueRemove = 'removeProperties';
  const typeValueClear = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case typeValueAdd:
        const keys = Object.keys(extraData);
        const values = Object.values(extraData);

        for (let i = 0; i < keys.length; i++) {
          copyState[keys[i]] = values[i];
        }
        break;

      case typeValueRemove:
        const mustToDelete = keysToRemove;

        deleteKey(mustToDelete, copyState);
        break;

      case typeValueClear:
        deleteKey(Object.keys(copyState), copyState);
        break;

      default:
        throw new Error('Erorr! The value wasn\'t found');
    }

    modifiedObjects.push({ ...copyState });
  }

  return modifiedObjects;
}

function deleteKey(array, object) {
  for (const key of array) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;

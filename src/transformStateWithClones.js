'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const modifyedObjects = [];
  const typeValueAdd = 'addProperties';
  const typeValueRemove = 'removeProperties';
  const typeValueClear = 'clear';

  for (const actionObject of actions) {
    switch (actionObject.type) {
      case typeValueAdd:
        const kyes = Object.keys(actionObject.extraData);
        const values = Object.values(actionObject.extraData);

        for (let i = 0; i < kyes.length; i++) {
          copyState[kyes[i]] = values[i];
        }
        pushValue(modifyedObjects, { ...copyState });
        break;
      case typeValueRemove:
        const mustToDelete = actionObject.keysToRemove;

        deleteKey(mustToDelete, copyState);
        pushValue(modifyedObjects, { ...copyState });
        break;
      case typeValueClear:
        deleteKey(Object.keys(copyState), copyState);
        pushValue(modifyedObjects, { ...copyState });
        break;
      default:
        return 'error';
    }
  }

  return modifyedObjects;
}

function pushValue(array, value) {
  array.push(value);
}

function deleteKey(array, object) {
  for (const key of array) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;

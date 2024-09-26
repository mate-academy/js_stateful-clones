'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectLog = [];
  const objectToModify = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        const dataToAdd = extraData;

        addProperty(objectToModify, dataToAdd);
        break;

      case REMOVE_PROPERTIES:
        const dataToRemove = keysToRemove;

        removeProperty(objectToModify, dataToRemove);
        break;

      case CLEAR:
        clearObject(objectToModify);
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }
    objectLog.push({ ...objectToModify });
  }

  return objectLog;
}

function addProperty(object, dataToAdd) {
  Object.assign(object, dataToAdd);
}

function removeProperty(object, dataToRemove) {
  for (const prop of dataToRemove) {
    delete object[prop];
  }
}

function clearObject(object) {
  Object.keys(object).forEach(key => delete object[key]);
}

module.exports = transformStateWithClones;

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

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        addProperty(objectToModify, actions[action].extraData);
        break;

      case 'removeProperties':
        removeProperty(objectToModify, actions[action].keysToRemove);
        break;

      case 'clear':
        clearObject(objectToModify);
        break;

      default:
        throw new Error(`Unknown action type: ${actions[action].type}`);
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

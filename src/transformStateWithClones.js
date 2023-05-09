'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const listOfStateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        removeProperty(stateClone, action.keysToRemove);
        break;

      case 'clear':
        clearObject(stateClone);
        break;

      default:
        return stateClone;
    }

    listOfStateVersions.push({ ...stateClone });
  }

  return listOfStateVersions;
}

function removeProperty(object, properties) {
  for (const property of properties) {
    delete object[property];
  }
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;

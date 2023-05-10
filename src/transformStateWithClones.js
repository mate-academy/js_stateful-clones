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
        removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        clearState(stateClone);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    listOfStateVersions.push({ ...stateClone });
  }

  return listOfStateVersions;
}

function removeProperties(object, properties) {
  for (const property of properties) {
    delete object[property];
  }
}

function clearState(object) {
  for (const key in object) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;

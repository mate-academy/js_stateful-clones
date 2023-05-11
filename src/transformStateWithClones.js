'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function removeProperties(object, properties) {
  for (const item of properties) {
    delete object[item];
  }
}

function clearObj(object) {
  for (const key in object) {
    delete object[key];
  }
}

function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(clonedState, action.keysToRemove);
        break;

      case 'clear':
        clearObj(clonedState);
        break;

      default:
        throw new Error('wrong action type');
    }

    stateVersions.push({ ...clonedState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;

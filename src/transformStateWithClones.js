'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addExtraDataToState(obj, extraKeys) {
  Object.assign(obj, extraKeys);
}

function removeKeys(obj, keysToRemove) {
  for (const keysToRemoveInArray of keysToRemove) {
    delete obj[keysToRemoveInArray];
  }
}

function clearState(obj) {
  for (const keys in obj) {
    delete obj[keys];
  }
}

function transformStateWithClones(state, actions) {
  const stateObject = { ...state };
  const result = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        addExtraDataToState(stateObject, element.extraData);
        break;
      case 'removeProperties':
        removeKeys(stateObject, element.keysToRemove);
        break;
      case 'clear':
        clearState(stateObject);
        break;
      default:
        return null;
    }
    result.push({ ...stateObject });
  }

  return result;
}

module.exports = transformStateWithClones;

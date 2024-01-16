'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newObject, action.extraData);
        result.push({ ...newObject });
        break;
      case 'removeProperties':
        removeProperties(newObject, action.keysToRemove);
        result.push({ ...newObject });
        break;
      case 'clear':
        clearProperties(newObject);
        result.push({ ...newObject });
        break;
    }
  }

  return result;
}

function addProperties(newObject, extraData) {
  return Object.assign(newObject, extraData);
}

function removeProperties(newObject, keysToRemove) {
  for (const key of keysToRemove) {
    delete newObject[key];
  }
}

function clearProperties(newObject) {
  for (const key in newObject) {
    delete newObject[key];
  }
}

module.exports = transformStateWithClones;

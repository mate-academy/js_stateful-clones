'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addToObject(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        delToObject(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearObject(stateCopy);
        break;

      default:
        throw new Error('Not a valid action');
    }
    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

function addToObject(obj, properties) {
  Object.assign(obj, properties);
}

function delToObject(obj, properties) {
  for (const property of properties) {
    delete obj[property];
  }
}

function clearObject(obj) {
  for (const key of Object.keys(obj)) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;

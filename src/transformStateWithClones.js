'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newObject = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newObject, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(newObject, action.keysToRemove);
        break;
      case 'clear':
        newObject = {};
        break;
    }

    result.push({ ...newObject });
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

module.exports = transformStateWithClones;

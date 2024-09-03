'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayWithObjects = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneState = {
          ...cloneState,
          ...action.extraData,
        };

        break;

      case 'removeProperties':
        cloneState = removeProperties(cloneState, action.keysToRemove);

        break;
      case 'clear':
        cloneState = {};

        break;
    }
    arrayWithObjects.push({ ...cloneState });
  }

  return arrayWithObjects;
}

function removeProperties(newObject, keysToRemove) {
  for (const key of keysToRemove) {
    delete newObject[key];
  }

  return newObject;
}

module.exports = transformStateWithClones;

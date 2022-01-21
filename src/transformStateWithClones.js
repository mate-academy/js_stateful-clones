'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = createClone(state);
  const clonedObject = [];

  const type = 'type';
  const extraData = 'extraData';
  const keysToRemove = 'keysToRemove';

  for (const object of actions) {
    if (object[type] === 'addProperties') {
      const objectExtraData = object[extraData];

      for (const key in objectExtraData) {
        newState[key] = objectExtraData[key];
      }
      clonedObject.push(createClone(newState));
    }

    if (object[type] === 'removeProperties') {
      for (const key of object[keysToRemove]) {
        delete newState[key];
      }

      clonedObject.push(createClone(newState));
    }

    if (object[type] === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }

      clonedObject.push({});
    }
  }

  return clonedObject;
}

function createClone(currentObject) {
  const newObject = {};

  for (const key in currentObject) {
    newObject[key] = currentObject[key];
  }

  return newObject;
}

module.exports = transformStateWithClones;

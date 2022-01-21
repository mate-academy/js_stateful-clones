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

  for (const action of actions) {
    switch (action[type]) {
      case 'addProperties':
        const objectExtraData = action[extraData];

        for (const key in objectExtraData) {
          newState[key] = objectExtraData[key];
        }
        clonedObject.push(createClone(newState));
        break;
      case 'removeProperties':
        for (const key of action[keysToRemove]) {
          delete newState[key];
        }

        clonedObject.push(createClone(newState));
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        clonedObject.push({});
        break;
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

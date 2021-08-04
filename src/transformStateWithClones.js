'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const collectionObjects = [];
  let objectStep = { ...state };

  function createClone(object) {
    const newObject = { ...object };

    return newObject;
  }

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        objectStep[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete objectStep[key];
      }
    } else if (action.type === 'clear') {
      for (const key in objectStep) {
        delete objectStep[key];
      }
    }

    collectionObjects.push(objectStep);
    objectStep = createClone(objectStep);
  }

  return collectionObjects;
}

module.exports = transformStateWithClones;

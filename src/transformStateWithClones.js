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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          objectStep[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objectStep[key];
        }
        break;

      case 'clear':
        for (const key in objectStep) {
          delete objectStep[key];
        }
    }

    collectionObjects.push(objectStep);
    objectStep = Object.assign({}, objectStep);
  }

  return collectionObjects;
}

module.exports = transformStateWithClones;

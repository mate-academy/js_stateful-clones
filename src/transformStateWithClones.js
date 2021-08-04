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
        Object.assign(objectStep, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objectStep[key];
        }
        break;

      case 'clear':
        objectStep = {};
        break;

      default:
        break;
    }

    collectionObjects.push(objectStep);
    objectStep = Object.assign({}, objectStep);
  }

  return collectionObjects;
}

module.exports = transformStateWithClones;

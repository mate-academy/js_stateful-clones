'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const objToTransform = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objToTransform, action.extraData);
        clones.push({ ...objToTransform });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(keyToRemove => {
          delete objToTransform[keyToRemove];
        });
        clones.push({ ...objToTransform });
        break;

      case 'clear':
        for (const prop in objToTransform) {
          delete objToTransform[prop];
        }
        clones.push({ ...objToTransform });
        break;

      default:
        clones.push({ ...objToTransform });
    }
  });

  return clones;
}

module.exports = transformStateWithClones;

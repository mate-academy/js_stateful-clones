'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayWithTransformations = [];
  const stateClone = { ...state };

  for (const object in actions) {
    switch (actions[object].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[object].extraData);
        arrayWithTransformations.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const char of actions[object].keysToRemove) {
          delete stateClone[char];
        }
        arrayWithTransformations.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        arrayWithTransformations.push({ ...stateClone });
        break;

      default:
        break;
    }
  }

  return arrayWithTransformations;
}

module.exports = transformStateWithClones;

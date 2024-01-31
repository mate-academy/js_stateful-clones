'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneObject = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCloneObject, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete stateCloneObject[key];
        }
        break;

      case 'clear':
        for (const key in stateCloneObject) {
          delete stateCloneObject[key];
        }
        break;

      default:
        break;
    }

    result.push({ ...stateCloneObject });
  }

  return result;
}

module.exports = transformStateWithClones;

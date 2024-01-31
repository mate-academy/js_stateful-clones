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
    if (obj.type === 'addProperties') {
      Object.assign(stateCloneObject, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete stateCloneObject[key];
      }
    }

    if (obj.type === 'clear') {
      for (const key in stateCloneObject) {
        delete stateCloneObject[key];
      }
    }

    result.push({ ...stateCloneObject });
  }

  return result;
}

module.exports = transformStateWithClones;

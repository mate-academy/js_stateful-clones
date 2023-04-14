'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(copyState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        if (key in copyState) {
          delete copyState[key];
        }
      }
    }

    if (obj.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete clone[key];
      }
    }

    if (obj.type === 'clear') {
      clone = {};
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;

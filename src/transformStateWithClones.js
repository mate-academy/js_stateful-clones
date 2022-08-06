'use strict';

/**
 * @param {Object} clone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformcloneWithresult(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
      result.push({ ...clone });
    }

    if (obj.type === 'removeProperties') {
      const toRemove = obj.keysToRemove;

      for (const key of toRemove) {
        delete clone[key];
      }
      result.push({ ...clone });
    }

    if (obj.type === 'clear') {
      for (const clear in clone) {
        delete clone[clear];
      }
      result.push({ ...clone });
    }
  }

  return result;
}

module.exports = transformcloneWithresult;

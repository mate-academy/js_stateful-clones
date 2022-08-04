'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const resArr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
      resArr.push({ ...clone });
    }

    if (obj.type === 'removeProperties') {
      const toRemove = obj.keysToRemove;

      for (const rem of toRemove) {
        delete clone[rem];
      }
      resArr.push({ ...clone });
    }

    if (obj.type === 'clear') {
      for (const clear in clone) {
        delete clone[clear];
      }
      resArr.push({ ...clone });
    }
  }

  return resArr;
}

module.exports = transformStateWithClones;

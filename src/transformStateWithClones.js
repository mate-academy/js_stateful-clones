'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

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
      for (const prop in clone) {
        delete clone[prop];
      }
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;

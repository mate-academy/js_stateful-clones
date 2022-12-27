'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const copyArr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
      copyArr.push({ ...clone });
    }

    if (obj.type === 'removeProperties') {
      for (const prop of obj.keysToRemove) {
        delete clone[prop];
      }
      copyArr.push({ ...clone });
    }

    if (obj.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
      copyArr.push({ ...clone });
    }
  }

  return copyArr;
}

module.exports = transformStateWithClones;

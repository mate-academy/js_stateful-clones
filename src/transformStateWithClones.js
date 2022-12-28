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
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;

      case 'removeProperties':
        for (const prop of obj.keysToRemove) {
          delete clone[prop];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
    }
    copyArr.push({ ...clone });
  }

  return copyArr;
}

module.exports = transformStateWithClones;

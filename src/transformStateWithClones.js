'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const cloneObject = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(cloneObject, key.extraData);
        clone.push({ ...cloneObject });
        break;

      case 'removeProperties':
        for (const i of key.keysToRemove) {
          delete cloneObject[i];
        } clone.push({ ...cloneObject });
        break;

      case 'clear':
        for (const x in cloneObject) {
          delete cloneObject[x];
        } clone.push({ ...cloneObject });
    }
  }

  return clone;
}

module.exports = transformStateWithClones;

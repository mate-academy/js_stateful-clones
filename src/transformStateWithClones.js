'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let objClone = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(objClone, obj.extraData);
        break;

      case 'removeProperties':
        for (const prop of obj.keysToRemove) {
          delete objClone[prop];
        }
        break;

      case 'clear':
        objClone = {};
        break;
    }

    arr.push({ ...objClone });
  }

  return arr;
}

module.exports = transformStateWithClones;

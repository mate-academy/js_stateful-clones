'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const arrClone = [];

  for (const x of actions) {
    if (x.type === 'addProperties') {
      Object.assign(clone, x.extraData);
      arrClone.push(clone);
      clone = { ...arrClone[arrClone.length - 1] };
    }

    if (x.type === 'removeProperties') {
      for (const i of x.keysToRemove) {
        if (clone.hasOwnProperty(i)) {
          delete clone[i];
        }
      }
      arrClone.push(clone);
      clone = { ...arrClone[arrClone.length - 1] };
    }

    if (x.type === `clear`) {
      for (const key in clone) {
        delete clone[key];
      }
      arrClone.push(clone);
      clone = { ...arrClone[arrClone.length - 1] };
    }
  }

  return arrClone;
}

module.exports = transformStateWithClones;

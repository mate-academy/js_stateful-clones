'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr1 = [];
  const stateCop = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      for (const b in i.extraData) {
        stateCop[b] = i.extraData[b];
      }
    }

    if (i.type === 'removeProperties') {
      for (const b of i.keysToRemove) {
        delete stateCop[b];
      }
    }

    if (i.type === 'clear') {
      for (const b in stateCop) {
        delete stateCop[b];
      }
    }
    arr1.push({ ...stateCop });
  }

  return arr1;
}

module.exports = transformStateWithClones;

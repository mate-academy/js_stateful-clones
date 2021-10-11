'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let i = 0;

  for (const key of actions) {
    const copy = {};

    if (i === 0) {
      Object.assign(copy, state);
    } else {
      Object.assign(copy, arr[i - 1]);
    }

    for (const lit in key) {
      if (key[lit] === 'addProperties') {
        Object.assign(copy, key.extraData);
      } else if (key[lit] === 'removeProperties') {
        for (const y of key.keysToRemove) {
          delete copy[y];
        }
      } else if (key[lit] === 'clear') {
        for (const part in copy) {
          delete copy[part];
        }
      }
    }
    arr.push(copy);
    i++;
  }

  return arr;
}

module.exports = transformStateWithClones;

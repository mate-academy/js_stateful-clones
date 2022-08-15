'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copy = { ...state };
  const arr1 = [];

  for (let i = 0; i < actions.length; i++) {
    const obj = actions[i];
    let obj2 = {};

    if (obj.type === 'addProperties') {
      copy = Object.assign(copy, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      const arr = obj.keysToRemove;

      for (let b = 0; b < arr.length; b++) {
        for (const key in copy) {
          if (key === arr[b]) {
            delete copy[key];
          }
        }
      }
    }

    if (obj.type === 'clear') {
      for (const key1 in copy) {
        delete copy[key1];
      }
    }
    obj2 = Object.assign(obj2, copy);
    arr1.push(obj2);
  }

  return arr1;
}

module.exports = transformStateWithClones;

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

    switch (obj.type) {
      case 'addProperties' :
        copy = Object.assign(copy, obj.extraData);
        break;

      case 'removeProperties' :
         for (const key of obj.keysToRemove) {
          delete copy[key];
        };
        break;

      case 'clear' :
        for (const key1 in copy) {
          delete copy[key1];
        }
        break;
    };

    obj2 = Object.assign(obj2, copy);
    arr1.push(obj2);
  }

  return arr1;
}

module.exports = transformStateWithClones;

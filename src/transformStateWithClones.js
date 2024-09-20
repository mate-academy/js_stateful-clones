'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let state1 = { ...state };
  const arr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      state1 = { ...state1, ...obj.extraData };
      arr.push({ ...state1 });
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete state1[key];
      }
      arr.push({ ...state1 });
    } else if (obj.type === 'clear') {
      state1 = {};
      arr.push(state1);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

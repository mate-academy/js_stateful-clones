'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const state2 = [];
  let obj = { ...state };
  let obj1 = {};
  let obj2 = {};
  let obj3 = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      obj = {
        ...obj,
        ...action.extraData,
      };
      obj1 = { ...obj };
      state2.push(obj1);
    } else if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete obj[prop];
      }
      obj2 = { ...obj };
      state2.push(obj2);
    } else if (action.type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
      obj3 = { ...obj };
      state2.push(obj3);
    }
  }

  return state2;
}

module.exports = transformStateWithClones;

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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        obj = {
          ...obj,
          ...action.extraData,
        };
        obj1 = { ...obj };
        state2.push(obj1);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete obj[prop];
        };
        obj1 = { ...obj };
        state2.push(obj1);
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        };
        obj1 = { ...obj };
        state2.push(obj1);
    }
  }

  return state2;
}

module.exports = transformStateWithClones;

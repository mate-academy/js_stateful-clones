'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const res = [];

  for (const keys of actions) {
    switch (keys.type) {
      case 'addProperties':
        Object.assign(obj, keys.extraData);
        break;

      case 'removeProperties' :
        for (const key of keys.keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear' :
        obj = {};
        break;
    }
    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;

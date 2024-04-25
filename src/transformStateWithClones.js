'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let obj = { ...state };

  for (const ch of actions) {
    if (ch.type === 'addProperties') {
      const extra = ch.extraData;

      for (const key in extra) {
        obj[key] = extra[key];
      }
      arr.push({ ...obj });
    }

    if (ch.type === 'removeProperties') {
      for (const iterator of ch.keysToRemove) {
        for (const keys in obj) {
          if (iterator === keys) {
            delete obj[iterator];
          }
        }
      }
      arr.push({ ...obj });
    }

    if (ch.type === 'clear') {
      obj = {};
      arr.push({ ...obj });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

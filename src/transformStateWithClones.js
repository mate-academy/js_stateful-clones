'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arr = [];

  for (const char of actions) {
    switch (char.type) {
      case 'addProperties' :
        for (const key in char.extraData) {
          obj[key] = char.extraData[key];
        }
        break;
      case 'removeProperties' :
        for (const key of char.keysToRemove) {
          delete obj[key];
        }
        break;
      case 'clear' :
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }

    const clone = { ...obj };

    arr.push(clone);
  }

  return arr;
}

module.exports = transformStateWithClones;

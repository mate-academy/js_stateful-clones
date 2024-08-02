'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const arr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        obj = { ...obj, ...extraData };
        arr.push({ ...obj });
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete obj[key];
        }
        arr.push({ ...obj });
        break;
      case 'clear':
        obj = {};
        arr.push({ ...obj });
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

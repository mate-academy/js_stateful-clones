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

        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete obj[key];
        }
        break;
      case 'clear':
        obj = {};
        break;
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;

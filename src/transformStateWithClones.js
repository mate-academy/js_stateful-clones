'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const obj = { ...state };

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }

    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;

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
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        for (const clear in obj) {
          delete obj[clear];
        }
        break;
    }

    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;

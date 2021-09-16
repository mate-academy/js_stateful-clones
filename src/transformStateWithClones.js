'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// eslint-disable-next-line no-shadow
function transformStateWithClones(state, actions) {
  const arr = [];
  const obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete obj[keyToRemove];
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

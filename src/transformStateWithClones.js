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
    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete obj[key];
      }
    }

    if (action.type === 'clear') {
      for (const key1 in obj) {
        delete obj[key1];
      }
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;

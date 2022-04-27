'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const a = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(a, key.extraData);
      arr.push({ ...a });
    }

    if (key.type === 'removeProperties') {
      for (const j of key.keysToRemove) {
        delete a[j];
      }
      arr.push({ ...a });
    }

    if (key.type === 'clear') {
      for (const k in a) {
        delete a[k];
      }
      arr.push({ ...a });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

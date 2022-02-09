'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const state2 = { ...state };
  const arr = [];

  for (const keys of actions) {
    switch (keys.type) {
      case 'addProperties':
        Object.assign(state2, keys.extraData);
        arr.push({ ...state2 });
        break;

      case 'removeProperties':
        for (const key of keys.keysToRemove) {
          delete state2[key];
        }
        arr.push({ ...state2 });
        break;

      case 'clear':
        for (const key in state2) {
          delete state2[key];
        }
        arr.push({ ...state2 });
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

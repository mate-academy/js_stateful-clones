'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const state1 = { ...state };
  const m = [];

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(state1, i.extraData);
      m.push({ ...state1 });
    }

    if (i.type === 'removeProperties') {
      for (const q of i.keysToRemove) {
        delete state1[q];
      }
      m.push({ ...state1 });
    }

    if (i.type === 'clear') {
      for (const x in state1) {
        delete state1[x];
      }
      m.push({ ...state1 });
    }
  }

  return m;
}

module.exports = transformStateWithClones;

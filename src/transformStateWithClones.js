'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const obj = { ...state };

  for (const el of actions) {
    if (el.type === 'addProperties') {
      Object.assign(obj, el.extraData);
    }

    if (el.type === 'clear') {
      for (const all in obj) {
        delete obj[all];
      }
    }

    if (el.type === 'removeProperties') {
      for (const del of el.keysToRemove) {
        delete obj[del];
      }
    }
    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;

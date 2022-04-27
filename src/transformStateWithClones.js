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
    switch (el.type) {
      case 'addProperties':
        Object.assign(obj, el.extraData);
        break;

      case 'clear':
        for (const all in obj) {
          delete obj[all];
        }
        break;

      case 'removeProperties':
        for (const del of el.keysToRemove) {
          delete obj[del];
        }
        break;
    }

    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;

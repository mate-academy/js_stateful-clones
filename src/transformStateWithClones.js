'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newOb = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(newOb, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const del of i.keysToRemove) {
        delete newOb[del];
      }
    }

    if (i.type === 'clear') {
      for (const all in newOb) {
        delete newOb[all];
      }
    }

    result.push({ ...newOb });
  }

  return result;
}
module.exports = transformStateWithClones;

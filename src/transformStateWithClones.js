'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const sum = [];
  let total = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(total, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const i of key.keysToRemove) {
        delete total[i];
      }
    }

    if (key.type === 'clear') {
      total = {};
    }

    sum.push({ ...total });
  }

  return sum;
}

module.exports = transformStateWithClones;

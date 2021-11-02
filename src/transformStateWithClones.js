'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };

  const result = [];

  for (const x of actions) {
    if (x.type === 'addProperties') {
      for (const i in x.extraData) {
        copy[i] = x.extraData[i];
      }
    }

    if (x.type === 'removeProperties') {
      for (const i of x.keysToRemove) {
        delete copy[i];
      }
    }

    if (x.type === 'clear') {
      for (const i in copy) {
        delete copy[i];
      }
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;

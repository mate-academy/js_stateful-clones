'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function deepCopy(obj) {
  if (obj === null) {
    return null;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  const copy = {};

  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }

  return copy;
}

function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const state2 = deepCopy(state);

  for (const a of actions) {
    if (a.type === 'addProperties') {
      for (const d in a.extraData) {
        state2[d] = a.extraData[d];
      }
      result.push(deepCopy(state2));
    }

    if (a.type === 'removeProperties') {
      for (const d of a.keysToRemove) {
        delete state2[d];
      }
      result.push(deepCopy(state2));
    }

    if (a.type === 'clear') {
      for (const d in state2) {
        delete state2[d];
      }
      result.push(deepCopy(state2));
    }
  }

  return result;
}

module.exports = transformStateWithClones;

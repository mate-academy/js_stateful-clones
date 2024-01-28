'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const a of actions) {
    if (a.type === 'addProperties') {
      for (const key in a.extraData) {
        stateClone[key] = a.extraData[key];
      }
      result.push({ ...stateClone });
    }

    if (a.type === 'removeProperties') {
      for (const b of a.keysToRemove) {
        delete stateClone[b];
      }
      result.push({ ...stateClone });
    }

    if (a.type === 'clear') {
      stateClone = {};
      result.push({ ...stateClone });
    }
  }

  return result;
}

module.exports = transformState;

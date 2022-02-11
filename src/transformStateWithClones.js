'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const newState = { ...state };

  for (const value of actions) {
    if (value['type'] === 'addProperties') {
      Object.assign(newState, value['extraData']);
    }

    if (value['type'] === 'removeProperties') {
      for (const item of value['keysToRemove']) {
        delete newState[item];
      }
    }

    if (value['type'] === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;

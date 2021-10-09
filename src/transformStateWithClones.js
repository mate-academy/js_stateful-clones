'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const iterator of actions) {
    const { type, extraData, keysToRemove } = iterator;

    if (type === 'addProperties') {
      newState = {
        ...newState, ...extraData,
      };
      arr.push({ ...newState });
    }

    if (type === 'removeProperties') {
      for (const iter of keysToRemove) {
        delete newState[iter];
      }
      arr.push(newState);
    }

    if (type === 'clear') {
      newState = {};
      arr.push(newState);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

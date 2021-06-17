'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = Object.assign({}, state);
  const result = [];

  for (const item of actions) {
    if (item.type === 'addProperties') {
      Object.assign(copy, item.extraData);
    }

    if (item.type === 'removeProperties') {
      for (const index of item.keysToRemove) {
        delete copy[index];
      }
    }

    if (item.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    const FinalCopy = { ...copy };

    result.push(FinalCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

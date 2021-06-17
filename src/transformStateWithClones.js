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
  const transformedState = [];

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

    const finalCopy = { ...copy };

    transformedState.push(finalCopy);
  }

  return transformedState;
}

module.exports = transformStateWithClones;

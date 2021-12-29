'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(copy, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete copy[key];
      }
    }

    if (type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;

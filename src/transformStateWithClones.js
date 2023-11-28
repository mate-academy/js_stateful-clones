'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(copy, extraData);
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete copy[key];
      }
    } else if (type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;

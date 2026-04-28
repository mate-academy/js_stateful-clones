'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      current = { ...current, ...extraData };
    }

    if (type === 'removeProperties') {
      current = { ...current };

      for (const key of keysToRemove) {
        delete current[key];
      }
    }

    if (type === 'clear') {
      current = {};
    }

    result.push(current);
  }

  return result;
}
module.exports = transformStateWithClones;

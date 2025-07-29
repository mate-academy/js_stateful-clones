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

  for (const { type, extraData = {}, keysToRemove = [] } of actions) {
    if (type === 'clear') {
      current = {};
    } else if (type === 'addProperties') {
      current = { ...current, ...extraData };
    } else if (type === 'removeProperties') {
      const updated = { ...current };

      for (const key of keysToRemove) {
        delete updated[key];
      }
      current = updated;
    }

    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

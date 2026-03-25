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

  for (const i of actions) {
    if (i.type === 'addProperties') {
      current = { ...current, ...i.extraData };
    }

    if (i.type === 'removeProperties') {
      for (const f of i.keysToRemove) {
        delete current[f];
      }
    }

    if (i.type === 'clear') {
      current = {};
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let current = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      current = { ...current, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const clone = { ...current };

      for (const key of action.keysToRemove) {
        delete clone[key];
      }
      current = clone;
    }

    if (action.type === 'clear') {
      current = {};
    }

    results.push(current);
  }

  return results;
}

module.exports = transformStateWithClones;

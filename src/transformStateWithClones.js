'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      current = { ...current, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      current = { ...current };

      for (const key of action.keysToRemove) {
        delete current[key];
      }
    } else if (action.type === 'clear') {
      current = {};
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

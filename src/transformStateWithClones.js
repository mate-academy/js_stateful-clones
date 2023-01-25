'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const toRemove of action.keysToRemove) {
        delete copy[toRemove];
      }
    } else if (action.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;

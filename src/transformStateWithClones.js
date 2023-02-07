'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      Object.assign(newState, extraData);
    } else if (type === 'removeProperties') {
      for (const remove of keysToRemove) {
        delete newState[remove];
      }
    } else if (type === 'clear') {
      newState = {};
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

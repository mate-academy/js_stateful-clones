'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = [];
  const newState = { ...state };

  for (const index of actions) {
    if (index.type === 'clear') {
      for (const stat in newState) {
        delete newState[stat];
      }
    }

    if (index.type === 'addProperties') {
      Object.assign(newState, index.extraData);
    }

    if (index.type === 'removeProperties') {
      for (const rem of index.keysToRemove) {
        delete newState[rem];
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

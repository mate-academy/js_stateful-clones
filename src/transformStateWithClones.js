'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(newState, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const keyToDel of key.keysToRemove) {
        delete newState[keyToDel];
      }
    }

    if (key.type === 'clear') {
      for (const keyNewState in newState) {
        delete newState[keyNewState];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

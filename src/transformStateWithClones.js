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

  for (const object of actions) {
    if (object.type === 'addProperties') {
      Object.assign(newState, object.extraData);
    }

    if (object.type === 'removeProperties') {
      for (const element of object.keysToRemove) {
        delete newState[element];
      }
    }

    if (object.type === 'clear') {
      for (const char in newState) {
        delete newState[char];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

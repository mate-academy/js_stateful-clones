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
    switch (object.type) {
      case 'addProperties':
        Object.assign(newState, object.extraData);
        break;

      case 'removeProperties':
        for (const element of object.keysToRemove) {
          delete newState[element];
        }
        break;

      case 'clear':
        for (const char in newState) {
          delete newState[char];
        }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(currentState, key.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of key.keysToRemove) {
          delete currentState[removeKey];
        }
        break;

      case 'clear':
        for (const clearKey in currentState) {
          delete currentState[clearKey];
        }
        break;

      default:
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

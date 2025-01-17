'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(newState, object.extraData);
        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

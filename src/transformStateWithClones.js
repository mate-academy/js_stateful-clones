'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties': {
        Object.assign(newState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const prop of keysToRemove) {
          delete newState[prop];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default:
        return 'error';
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

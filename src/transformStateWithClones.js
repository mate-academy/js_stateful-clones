'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(state, actions) {
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const copyState = { ...state };

    switch (type) {
      case 'addProperties': {
        Object.assign(copyState, extraData);
        result.push({ ...copyState });
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        result.push({ ...copyState });
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        result.push({ ...copyState });
        break;
      }

      default:
        break;
    }
  }

  return result;
}

module.exports = transformState;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const [key, value] of Object.entries(copyState)) {
    copyState[key] = value.trim();
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

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

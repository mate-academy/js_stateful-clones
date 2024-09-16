'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(copyState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      }

      default:
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;

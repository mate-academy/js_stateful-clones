'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const option of actions) {
    const { type, extraData, keysToRemove } = option;

    switch (type) {
      case ('addProperties'): {
        Object.assign(copy, extraData);
        break;
      }

      case ('removeProperties'): {
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;
      }

      case ('clear'): {
        for (const key in copy) {
          delete copy[key];
        }
        break;
      }

      default:
        break;
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;

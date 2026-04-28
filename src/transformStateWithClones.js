'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        current = { ...current, ...extraData };
        break;

      case 'removeProperties':
        current = { ...current };

        for (const key of keysToRemove) {
          delete current[key];
        }
        break;

      case 'clear':
        current = {};
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    result.push(current);
  }

  return result;
}

module.exports = transformStateWithClones;

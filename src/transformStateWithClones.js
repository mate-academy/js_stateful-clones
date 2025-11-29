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

  for (const a of actions) {
    switch (a.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = { ...current, ...a.extraData };
        break;

      case 'removeProperties':
        current = { ...current };

        for (const k of a.keysToRemove) {
          delete current[k];
        }
        break;

      default:
        break;
    }

    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

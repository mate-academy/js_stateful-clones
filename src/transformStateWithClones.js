'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // eslint-disable-next-line prettier/prettier
  const result = [];
  let current = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties': {
        const extra = action.extraData || {};

        current = { ...current, ...extra };
        break;
      }

      case 'removeProperties': {
        const keys = action.keysToRemove || [];
        const next = { ...current };
        // eslint-disable-next-line padding-line-between-statements
        for (const k of keys) {
          delete next[k];
        }
        current = next;
        break;
      }

      default:
        current = { ...current };
    }

    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = { ...state };

  for (const action of actions) {
    switch (action?.type) {
      case 'clear': {
        current = {};
        break;
      }

      case 'addProperties': {
        const extra =
          action && action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};

        current = { ...current, ...extra };
        break;
      }

      case 'removeProperties': {
        const toRemove = Array.isArray(action?.keysToRemove)
          ? action.keysToRemove
          : [];

        const next = { ...current };

        for (const key of toRemove) {
          delete next[key];
        }
        current = next;
        break;
      }
      default:
        current = { ...current };
    }
    history.push({ ...current });
  }

  return history;
}

module.exports = transformStateWithClones;

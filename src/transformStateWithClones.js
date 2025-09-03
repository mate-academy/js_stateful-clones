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
    switch (action.type) {
      case 'clear': {
        current = {};
        break;
      }

      case 'addProperties': {
        const extra = action.extraData || {};

        current = { ...current, ...extra };
        break;
      }

      case 'removeProperties': {
        const toRemove = new Set(action.keysToRemove || []);

        current = Object.fromEntries(
          Object.entries(current).filter(([key]) => !toRemove.has(key)),
        );
        break;
      }

      default:
        break;
    }

    history.push({ ...current });
  }

  return history;
}

module.exports = transformStateWithClones;

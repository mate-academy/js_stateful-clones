'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = clone(state);
  const history = [];

  for (let i = 0; i < (actions ? actions.length : 0); i++) {
    const action = actions[i] || {};

    switch (action.type) {
      case 'clear': {
        current = {};
        break;
      }

      case 'addProperties': {
        const extra = action?.extraData || {};

        current = { ...current, ...extra };
        break;
      }

      case 'removeProperties': {
        const toRemove = new Set(action?.keysToRemove || []);
        const next = {};

        for (const key in current) {
          if (
            Object.prototype.hasOwnProperty.call(current, key) &&
            !toRemove.has(key)
          ) {
            next[key] = current[key];
          }
        }
        current = next;
        break;
      }
      default:
        break;
    }
    history.push(clone(current));
  }

  return history;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = transformStateWithClones;

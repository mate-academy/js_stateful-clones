'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        current = {};
        break;
      }

      case 'addProperties': {
        const extras = action.extraData || {};
        current = { ...current, ...extras };
        break;
      }

      case 'removeProperties': {
        const keys = action.keysToRemove || [];
        const next = { ...current };
        for (const key of keys) {
          delete next[key];
        }
        current = next;
        break;
      }

    }

    history.push({ ...current });
  }

  return history;
}

module.exports = transformStateWithClones;

/* eslint-disable no-undef */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// eslint-disable-next-line no-unused-vars
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        current = {};
        break;
      case 'addProperties':
        current = { ...current, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];
        const next = { ...current };

        for (const k of keys) {
          delete next[k];
        }
        current = next;
        break;
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;

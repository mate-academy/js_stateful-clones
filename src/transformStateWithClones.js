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
      case 'addProperties':
        current = { ...current, ...action.extraData };
        break;

      case 'removeProperties': {
        const next = { ...current };

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        current = next;
        break;
      }

      case 'clear':
        current = {};
        break;
    }

    history.push({ ...current });
  }

  return history;
}

module.exports = transformStateWithClones;

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
    if (action.type === 'addProperties') {
      current = { ...current, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      current = { ...current };

      for (const key of action.keysToRemove) {
        delete current[key];
      }
    }

    if (action.type === 'clear') {
      current = {};
    }

    history.push({ ...current });
  }

  return history;
}

module.exports = transformStateWithClones;

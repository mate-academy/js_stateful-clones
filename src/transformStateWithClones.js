'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const RESULT = [];
  let STATE_HISTORY = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      STATE_HISTORY = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(STATE_HISTORY, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete STATE_HISTORY[key];
      }
    }
    RESULT.push({ ...STATE_HISTORY });
  }

  return RESULT;
}

module.exports = transformStateWithClones;

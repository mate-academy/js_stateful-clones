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
    switch (action.type) {
      case 'clear':
        STATE_HISTORY = {};
        break;

      case 'addProperties':
        Object.assign(STATE_HISTORY, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete STATE_HISTORY[key];
        }
        break;
    }
    RESULT.push({ ...STATE_HISTORY });
  }

  return RESULT;
}

module.exports = transformStateWithClones;

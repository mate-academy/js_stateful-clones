'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_ARRAY = [];
  const CURRENT_STATE = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(CURRENT_STATE, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete CURRENT_STATE[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in CURRENT_STATE) {
        delete CURRENT_STATE[key];
      }
    }
    STATE_ARRAY.push({ ...CURRENT_STATE });
  }

  return STATE_ARRAY;
}

module.exports = transformStateWithClones;

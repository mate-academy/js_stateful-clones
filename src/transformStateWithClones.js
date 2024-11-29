'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let CURRENT_STATE = { ...state };
  const NEW_STATE = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      CURRENT_STATE = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(CURRENT_STATE, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete CURRENT_STATE[key];
      }
    }
    NEW_STATE.push({ ...CURRENT_STATE });
  }

  return NEW_STATE;
}

module.exports = transformStateWithClones;

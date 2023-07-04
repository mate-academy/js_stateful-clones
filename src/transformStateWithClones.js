'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const COPY_STATE = { ...state };
  const NEW_STATE = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(COPY_STATE, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete COPY_STATE[key];
        }
        break;

      case 'clear':
        for (const value in COPY_STATE) {
          delete COPY_STATE[value];
        }
        break;
    }

    NEW_STATE.push({ ...COPY_STATE });
  }

  return NEW_STATE;
}

module.exports = transformStateWithClones;

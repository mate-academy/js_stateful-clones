'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const NEW_STATE = { ...state };
  const STATES = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        Object.assign(NEW_STATE, ACTION.extraData);
        break;

      case 'removeProperties':
        for (const ELEM of ACTION.keysToRemove) {
          delete NEW_STATE[ELEM];
        }
        break;

      case 'clear':
        for (const KEY in NEW_STATE) {
          delete NEW_STATE[KEY];
        }
        break;

      default:
        break;
    }
    STATES.push({ ...NEW_STATE });
  }

  return STATES;
}

module.exports = transformStateWithClones;

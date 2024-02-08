'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const FINAL_RESULT = [];
  let NEXT_STATE = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        NEXT_STATE = {
          ...NEXT_STATE,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete NEXT_STATE[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in NEXT_STATE) {
          delete NEXT_STATE[key];
        };
        break;
      default:
        break;
    }
    FINAL_RESULT.push({ ...NEXT_STATE });
  }

  return FINAL_RESULT;
}

module.exports = transformStateWithClones;

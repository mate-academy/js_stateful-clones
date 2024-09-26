'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let NEXT_STATE = { ...state };
  const RESULT = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(NEXT_STATE, extraData);
        break;

      case 'removeProperties':
        if (keysToRemove && keysToRemove.length > 0) {
          for (const key of keysToRemove) {
            delete NEXT_STATE[key];
          }
        }

        if (Object.keys(NEXT_STATE).length === 0) {
          NEXT_STATE = {};
        }
        break;

      case 'clear':
        for (const key in NEXT_STATE) {
          delete NEXT_STATE[key];
        }
        break;
    }
    RESULT.push({ ...NEXT_STATE });
  }

  return RESULT;
}

module.exports = transformStateWithClones;

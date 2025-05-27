'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const RESULT = [];
  const CLONED_STATE = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(CLONED_STATE, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete CLONED_STATE[key];
        }
        break;

      case 'clear':
        for (const key in CLONED_STATE) {
          delete CLONED_STATE[key];
        }
        break;

      default:
        break;
    }

    RESULT.push({ ...CLONED_STATE });
  }

  return RESULT;
}

module.exports = transformStateWithClones;

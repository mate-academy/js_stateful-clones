'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_CLONE = { ...state };
  const RESULT = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        Object.assign(STATE_CLONE, ACTION.extraData);
        break;
      case 'removeProperties':
        for (const KEY_TO_DEL of ACTION.keysToRemove) {
          delete STATE_CLONE[KEY_TO_DEL];
        }
        break;
      case 'clear':
        for (const KEY_TO_DEL in STATE_CLONE) {
          delete STATE_CLONE[KEY_TO_DEL];
        }
        break;
    }
    RESULT.push({ ...STATE_CLONE });
  }

  return RESULT;
}
module.exports = transformStateWithClones;

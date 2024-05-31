'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_HISTORY = [];
  const CLONED_STATE = { ...state };

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        for (const KEY in ACTION.extraData) {
          CLONED_STATE[KEY] = ACTION.extraData[KEY];
        }

        STATE_HISTORY.push({ ...CLONED_STATE });
        break;
      case 'removeProperties':
        for (const KEY of ACTION.keysToRemove) {
          delete CLONED_STATE[KEY];
        }

        STATE_HISTORY.push({ ...CLONED_STATE });
        break;
      case 'clear':
        for (const KEY in CLONED_STATE) {
          delete CLONED_STATE[KEY];
        }

        STATE_HISTORY.push({ ...CLONED_STATE });
        break;
    }
  }

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CLONE_STATE = { ...state };
  const HISTORY_STATE = [];

  for (let i = 0; i < actions.length; i++) {
    const CURRENT_ACTION = actions[i];
    const ACTION_TYPE = CURRENT_ACTION.type;

    switch (ACTION_TYPE) {
      case 'addProperties':
        Object.assign(CLONE_STATE, ...[CURRENT_ACTION.extraData]);
        HISTORY_STATE.push({ ...CLONE_STATE });
        break;

      case 'removeProperties':
        const KEYS_TO_REMOVE = CURRENT_ACTION.keysToRemove;

        for (const key of KEYS_TO_REMOVE) {
          delete CLONE_STATE[key];
        }
        HISTORY_STATE.push({ ...CLONE_STATE });
        break;

      case 'clear':
        for (const key of Object.keys(CLONE_STATE)) {
          delete CLONE_STATE[key];
        }
        HISTORY_STATE.push({ ...CLONE_STATE });
        break;
    }
  }

  return HISTORY_STATE;
}

module.exports = transformStateWithClones;

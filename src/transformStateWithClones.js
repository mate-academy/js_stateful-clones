'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let CLONED_STATE = { ...state };
  const RECEIVED_STATES = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      CLONED_STATE = { ...CLONED_STATE, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      CLONED_STATE = Object.fromEntries(
        Object.entries(CLONED_STATE).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    } else if (action.type === 'clear') {
      CLONED_STATE = {};
    }

    RECEIVED_STATES.push({ ...CLONED_STATE });
  }

  return RECEIVED_STATES;
}

module.exports = transformStateWithClones;

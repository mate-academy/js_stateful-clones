'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CHANGED_STATE = Object.assign({}, state);
  const CHANGED_STATES = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProperty(CHANGED_STATE, action.extraData);
        CHANGED_STATES.push({ ...CHANGED_STATE });
        break;
      }

      case 'removeProperties': {
        removeProperty(CHANGED_STATE, action.keysToRemove);
        CHANGED_STATES.push({ ...CHANGED_STATE });
        break;
      }

      default: {
        clear(CHANGED_STATE);
        CHANGED_STATES.push({ ...CHANGED_STATE });
      }
    }
  }

  return CHANGED_STATES;
}

function addProperty(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperty(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;

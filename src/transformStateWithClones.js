'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = [];
  const states = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(states, action.extraData);
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(function (key) {
        delete states[key];
      });
    }

    if (action.type === 'clear') {
      for (const key in states) {
        if (states.hasOwnProperty(key)) {
          delete states[key];
        }
      }
    }

    currentState.push({ ...states });
  }

  return currentState;
}

module.exports = transformStateWithClones;

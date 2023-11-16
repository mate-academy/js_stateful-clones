'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];

  for (let i = 0; i < actions.length; i++) {
    const nextState = {};

    if (i > 0) {
      Object.assign(nextState, newActions[i - 1]);
    } else {
      Object.assign(nextState, state);
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(nextState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete nextState[actions[i].keysToRemove[j]];
      }
    } else {
      Object.keys(nextState).forEach(key => delete nextState[key]);
    }

    newActions[i] = nextState;
  }

  return newActions;
}

module.exports = transformStateWithClones;

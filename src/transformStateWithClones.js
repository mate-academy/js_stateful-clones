'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = {};

  Object.assign(currentState, state);

  for (let i = 0; i < actions.length; i++) {
    const updatedState = {};

    Object.assign(updatedState, currentState);

    if (actions[i].type === 'addProperties') {
      Object.assign(updatedState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach((key) => delete updatedState[key]);
    } else if (actions[i].type === 'clear') {
      for (const key in updatedState) {
        delete updatedState[key];
      }
    }

    stateHistory.push(updatedState);
    currentState = updatedState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

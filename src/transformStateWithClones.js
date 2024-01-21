'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = Object.assign({}, currentState);

    if (actions[i].type === 'clear') {
      newState = {};
    } else if (actions[i].type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (let n = 0; n < action.keysToRemove.length; n++) {
        delete newState[action.keysToRemove[n]];
      }
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

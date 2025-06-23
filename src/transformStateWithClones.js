'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    // Create a new state based on the previous one
    let nextState = { ...currentState };

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    history.push(nextState);
    currentState = nextState; // Move to next state
  }

  return history;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

   const CLEAR = 'clear';
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';

  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    if (action.type === CLEAR) {
      nextState = {};
    }

    if (action.type === ADD) {
      Object.assign(nextState, action.extraData);
    }

    if (action.type === REMOVE) {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

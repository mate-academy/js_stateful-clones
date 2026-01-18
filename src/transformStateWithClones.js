'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case `clear`:
        nextState = {};
        break;
      case `addProperties`:
        nextState = Object.assign(nextState, action.extraData);
        break;
      case `removeProperties`:
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      default:
        nextState = { ...currentState };
        break;
    }
    currentState = nextState;
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;

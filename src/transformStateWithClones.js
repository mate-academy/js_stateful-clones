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
    let nextState;

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      nextState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      nextState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else {
      nextState = { ...currentState };
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;

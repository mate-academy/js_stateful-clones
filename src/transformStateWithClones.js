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
    let nextState = { ...currentState };

    if (action.type === 'clear') {
      nextState = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;

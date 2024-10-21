'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  for (const action of actions) {
    currentState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete currentState[prop];
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

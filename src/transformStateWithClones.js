'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = { ...state };

  for (const action of actions) {
    const currentState = { ...previousState };

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }
    states.push(currentState);
    previousState = currentState;
  }

  return states;
}

module.exports = transformStateWithClones;

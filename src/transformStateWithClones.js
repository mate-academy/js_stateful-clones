'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    const nextState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in nextState) {
        delete nextState[key];
      }
    }
    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;

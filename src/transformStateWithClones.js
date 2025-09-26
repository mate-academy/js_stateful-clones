'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let newState = {};
  let currentState = { ...state };

  for (const step of actions) {
    newState = { ...currentState };

    if (step.type === 'clear') {
      newState = {};
    }

    if (step.type === 'addProperties') {
      Object.assign(newState, step.extraData);
    }

    if (step.type === 'removeProperties') {
      for (const key of step.keysToRemove) {
        delete newState[key];
      }
    }

    results.push(newState);
    currentState = newState;
  }

  return results;
}
module.exports = transformStateWithClones;

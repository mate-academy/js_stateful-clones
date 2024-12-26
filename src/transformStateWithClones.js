'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    states.push(currentState);
    currentState = structuredClone(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

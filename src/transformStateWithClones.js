'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = structuredClone(state);
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    states.push(structuredClone(currentState));
  }

  return states;
}

module.exports = transformStateWithClones;

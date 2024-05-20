'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateAtTheMoment = { ...state }; // clone the state at the beginning
  const stateHistory = []; // const, because an array is an object in JS

  for (const action of actions) {
    let newState = { ...stateAtTheMoment };
    // Clone the current state to the new state

    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    stateHistory.push(newState);
    // push the new state to the empty array, where the result is collected

    stateAtTheMoment = newState; // update the current state to the new state
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

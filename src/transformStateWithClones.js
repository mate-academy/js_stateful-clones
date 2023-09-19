'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let temporalState = { ...currentState };

    if (action.type === 'addProperties' && action.extraData) {
      for (const key in action.extraData) {
        temporalState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties' && action.keysToRemove) {
      for (const key of action.keysToRemove) {
        delete temporalState[key];
      }
    }

    if (action.type === 'clear') {
      temporalState = {};
    }

    result.push(temporalState);

    currentState = temporalState;
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      nextState = {};
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;

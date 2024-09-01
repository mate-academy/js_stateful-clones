'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let previousState = { ...state };

  for (const action of actions) {
    const { type } = action;

    let newState = { ...previousState };

    if (type === 'addProperties') {
      newState = Object.assign({}, previousState, action.extraData);
    }

    if (type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (type === 'clear') {
      newState = {};
    }

    stateHistory.push(newState);
    previousState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

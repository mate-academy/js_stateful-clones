'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let state = { ...initialState };

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else {
      newState = { ...state };

      if (action.type === 'addProperties') {
        Object.assign(newState, action.extraData);
      } else if (action.type === 'removeProperties') {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
      }
    }

    stateHistory.push(newState);
    state = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

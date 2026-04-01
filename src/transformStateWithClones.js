'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateClone = structuredClone(state);

  for (const action of actions) {
    const newState = structuredClone(stateClone);

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
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
    stateClone = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

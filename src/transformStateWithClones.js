'use strict';

/*
  @param {Object} state
  @param {Object[]} actions

  @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !keysToRemove.includes(key),
        ),
      );
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

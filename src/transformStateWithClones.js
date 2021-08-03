'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    let stateToCopy = stateHistory[stateHistory.length - 1];
    const { type: actionType } = action;

    if (actionType === 'clear') {
      stateHistory.push({});
      continue;
    }

    if (stateHistory.length === 0) {
      stateToCopy = state;
    }

    const tempState = { ...stateToCopy };

    if (actionType === 'addProperties') {
      Object.assign(tempState, action.extraData);
    }

    if (actionType === 'removeProperties') {
      if (action.keysToRemove.length !== 0) {
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }
      }
    }

    stateHistory.push(tempState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

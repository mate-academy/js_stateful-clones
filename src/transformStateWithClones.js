'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let tempState = { ...state };

  for (const action of actions) {
    const { type: actionType } = action;

    switch (actionType) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }
        break;

      case 'clear':
        tempState = {};
    }

    stateHistory.push(tempState);
    tempState = { ...stateHistory[stateHistory.length - 1] };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

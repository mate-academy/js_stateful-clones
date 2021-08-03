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

    if (stateHistory.length === 0) {
      stateToCopy = state;
    }

    const tempState = { ...stateToCopy };

    switch (actionType) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        stateHistory.push(tempState);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }
        stateHistory.push(tempState);

        break;

      case 'clear':
        stateHistory.push({});
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

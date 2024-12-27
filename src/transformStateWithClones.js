'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = {};
  let stateAfterAction = {};

  for (const action of actions) {
    currentState = { ...(stateHistory.at(-1) || { ...state }) };

    switch (action.type) {
      case 'clear':
        stateAfterAction = {};
        break;

      case 'addProperties':
        stateAfterAction = Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        stateAfterAction = currentState;
        break;
    }

    stateHistory.push(stateAfterAction);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

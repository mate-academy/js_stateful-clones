'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  const ADD = 'addProperties';
  const SUB = 'removeProperties';
  const DEL = 'clear';

  for (const action of actions) {
    if (action.type === ADD) {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === SUB) {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === DEL) {
      currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

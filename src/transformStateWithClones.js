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

  for (const action of actions) {
    let nextState = {};

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        nextState = { ...currentState };

        for (const newKey in action.extraData) {
          nextState[newKey] = action.extraData[newKey];
        }
        break;
      case 'removeProperties':
        for (const k in currentState) {
          if (!action.keysToRemove.includes(k)) {
            nextState[k] = currentState[k];
          }
        }
        break;
    }

    stateHistory.push({ ...nextState });
    currentState = { ...nextState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

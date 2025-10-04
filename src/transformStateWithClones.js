'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = { ...state };

  for (const action of actions) {
    let workingState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        addProperties(workingState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(workingState, action.keysToRemove);
        break;

      case 'clear':
        workingState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...workingState });
    prevState = workingState;
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;

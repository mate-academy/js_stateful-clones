'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let prevState = { ...state }; // Копія початкового стану

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...prevState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      newState = { ...prevState };
      action.keysToRemove.forEach((key) => delete newState[key]);
    } else {
      throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push(newState);
    prevState = newState;
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = []; // empty array that holds history of changes
  let currentState = { ...state }; // deep copy of the initial state object

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData, // copy the current state
          // and adds extra action
        };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error();
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

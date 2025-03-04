'use strict';

/**
 * @param {Object} clonedState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    let tempClonedState = { ...clonedState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          tempClonedState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempClonedState[key];
        }
        break;

      case 'clear':
        tempClonedState = {};
        break;

      default:
        break;
    }
    stateHistory.push(tempClonedState);
    clonedState = { ...tempClonedState };
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

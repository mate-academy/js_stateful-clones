'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let currentState = { ...initialState };

  actions.forEach((action) => {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(stateCopy);

    currentState = stateCopy;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

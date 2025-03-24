'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let state = { ...initialState };

  actions.forEach((action) => {
    let stateCopy;

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...state, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = { ...state };

        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(stateCopy);
    state = { ...stateCopy };
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const statesHistory = [];
  let stateCopy = { ...initialState };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push(nextState);
    stateCopy = nextState;
  }

  return statesHistory;
}
module.exports = transformStateWithClones;

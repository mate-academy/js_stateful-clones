'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error('incorrect action type');
    }
    statesHistory.push({ ...currentState });
  });

  return statesHistory;
}

module.exports = transformStateWithClones;

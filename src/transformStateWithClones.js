'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const initialState = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(initialState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete initialState[key];
        });
        break;

      case 'clear':
        for (const key in initialState) {
          delete initialState[key];
        }
        break;

      default:
        break;
    }

    stateHistory.push({ ...initialState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

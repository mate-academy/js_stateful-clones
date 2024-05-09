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

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;
    const nextState = { ...currentState };

    switch (type) {
      case 'addProperties':
        Object.assign(nextState, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete nextState[key]);
        break;
      case 'clear':
        Object.keys(nextState).forEach((key) => delete nextState[key]);
        break;
      default:
        break;
    }
    stateHistory.push({ ...nextState });
    currentState = { ...nextState };
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

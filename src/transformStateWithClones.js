'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }

    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

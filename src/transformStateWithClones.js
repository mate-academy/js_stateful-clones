'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  actions.forEach(({ type, extraData, keysToRemove }) => {
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
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

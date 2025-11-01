'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}

 */

function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const stateHistory = [];

  actions.forEach((e) => {
    let newState = { ...currentState };

    switch (e.type) {
      case 'addProperties':
        newState = { ...currentState, ...e.extraData };
        break;
      case 'removeProperties':
        for (const key of e.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
      default:
        newState = { ...currentState };
        break;
    }

    stateHistory.push(newState);
    currentState = { ...newState };
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

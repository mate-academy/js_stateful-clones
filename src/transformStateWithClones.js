'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action; // Виправлення 1: Визначення деструктуризації

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData }; // Виправлення 2: Виправлено extraData
        break;
      case 'clear':
        currentState = {};
        break;
      case 'removeProperties':
        for (const prop of keysToRemove) {
          delete currentState[prop];
        }
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

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

  actions.forEach(action => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete currentState[key];
        });
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`);
    }

    // Додаємо копію поточного стану до історії
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}




module.exports = transformStateWithClones;

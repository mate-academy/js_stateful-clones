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

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Створюємо порожній об'єкт
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
    }

    stateHistory.push(Object.assign({}, currentState));
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

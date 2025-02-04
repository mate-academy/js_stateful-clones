'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Копія початкового стану
  const statesHistory = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };
      action.keysToRemove.forEach((key) => delete currentState[key]);
    } else if (action.type === 'clear') {
      currentState = {};
    }
    statesHistory.push({ ...currentState }); // Зберігаємо копію стану
  });

  return statesHistory;
}

module.exports = transformStateWithClones;

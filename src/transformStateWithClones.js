'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Початковий стан, який буде оновлюватись
  let currentState = { ...state };
  const stateHistory = [];

  // Цикл по діях
  actions.forEach((action) => {
    // В залежності від типу дії, оновлюємо currentState
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const nextState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete nextState[key];
      });
      currentState = nextState;
    } else if (action.type === 'clear') {
      currentState = {};
    }

    // Додаємо клон поточного стану до історії
    stateHistory.push({ ...currentState });
  });

  // Повертаємо історію станів
  return stateHistory;
}

module.exports = transformStateWithClones;

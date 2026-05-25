'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = state;

  for (const action of actions) {
    let nextState;

    if (action.type === 'clear') {
      // Створюємо повністю порожній об'єкт
      nextState = {};
    } else if (action.type === 'addProperties') {
      // Клонуємо поточний стан і додаємо нові властивості
      nextState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      // Спочатку клонуємо поточний стан
      nextState = { ...currentState };

      // Потім видаляємо потрібні ключі з нового клону
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    // Додаємо новий стан в історію
    history.push(nextState);

    // Оновлюємо поточний стан для наступної ітерації циклу
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;

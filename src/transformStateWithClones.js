'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  // Починаємо з копії початкового стану, щоб не змінювати оригінал
  let currentState = { ...state };

  actions.forEach((action) => {
    let nextState;

    switch (action.type) {
      case 'clear':
        // Створюємо абсолютно новий порожній об'єкт
        nextState = {};
        break;

      case 'addProperties':
        // Створюємо копію поточного стану і додаємо нові дані
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Створюємо копію поточного стану
        nextState = { ...currentState };

        // Видаляємо ключі з копії
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;

      default:
        // Якщо тип невідомий, стан не змінюється
        nextState = { ...currentState };
    }

    // Додаємо результат поточної дії в історію
    history.push(nextState);
    // Оновлюємо "поточний стан" для наступної ітерації
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;

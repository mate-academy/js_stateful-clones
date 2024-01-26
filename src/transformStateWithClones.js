'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Створення масиву для зберігання станів після кожної дії
  const states = [];

  // Створення клону початкового стану за допомогою Object.assign
  let currentState = Object.assign({}, state,);

  // Ітерація через кожну дію в масиві actions
  for (const action of actions) {
    let nextState; // Змінна для зберігання стану після застосування дії

    // Використання оператора switch для обробки різних типів дій
    switch (action.type) {
      case 'clear':
        // Якщо тип дії - 'clear', створити порожній стан
        nextState = {};
        break;

      case 'addProperties':
        // Якщо тип дії - 'addProperties', додати extraData до стану
        // Створити новий об'єкт, комбінуючи поточний стан і extraData
        nextState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        // Якщо тип дії - 'removeProperties', видалити вказані ключі зі стану
        // Створити новий об'єкт як клон поточного стану
        nextState = Object.assign({}, currentState);

        for (const keyToRemove of action.keysToRemove) {
          // Перевірка, чи ключ існує в nextState перед видаленням
          if (nextState.hasOwnProperty(keyToRemove)) {
            delete nextState[keyToRemove];
          }
        }
        break;

      default:
        // Ігнорувати невідомі типи дій та переходити до наступної ітерації
        continue;
    }

    // Додавання nextState до масиву states
    states.push(nextState);

    // Оновлення currentState для наступної ітерації
    currentState = nextState;
  }

  // Повернення масиву станів після кожної дії
  return states;
}

module.exports = transformStateWithClones;

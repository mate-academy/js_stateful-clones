'use strict';

/**
 * Застосовує масив дій до state і повертає історію станів.
 *
 * @param {object} state - початковий стан
 * @param {object[]} actions - масив дій
 * @return {object[]} - масив станів після кожної дії
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear':
        // Створюємо абсолютно новий порожній об'єкт
        nextState = {};
        break;

      case 'addProperties':
        // Створюємо копію поточного стану та додаємо нові дані
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Копіюємо стан та видаляємо зайві ключі
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        nextState = { ...currentState };
        break;
    }

    history.push(nextState);
    // Наступна дія буде базуватися на результаті поточної
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;

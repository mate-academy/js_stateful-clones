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

  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'addProperties':
        // Створюємо клон і додаємо дані
        newState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Створюємо клон і видаляємо дані
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });

        break;
      case 'clear':
        // Створюємо порожній об'єкт
        newState = {};
        break;
    }

    // Пушимо клон в історію
    history.push(newState);

    // Оновлюємо поточний стан, щоб наступна дія відштовхувалася вже від нього!
    currentState = newState;
  });

  return history;
}

module.exports = transformStateWithClones;

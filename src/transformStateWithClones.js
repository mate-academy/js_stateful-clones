'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentStateCopy = { ...state }; // створення копії початкового стану
  const history = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        // Створення копії поточного стану з доданими властивостями
        currentStateCopy = { ...currentStateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        // Створення копії поточного стану та видалення вказаних властивостей
        currentStateCopy = { ...currentStateCopy };
        action.keysToRemove.forEach(key => {
          delete currentStateCopy[key];
        });
        break;

      case 'clear':
        // Створення порожнього об'єкта
        currentStateCopy = {};
        break;

      default:
        throw new Error('Invalid action type');
    }

    // Додаємо копію поточного стану в історію
    history.push({ ...currentStateCopy });
  });

  return history;
}

module.exports = transformStateWithClones;

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Створюємо копію початкового state
  const states = []; // Масив для збереження результатів

  for (const action of actions) {
    if (action.type === 'addProperties') {
      // Додаємо властивості
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      // Видаляємо вказані ключі
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }

    if (action.type === 'clear') {
      // Створюємо новий порожній об'єкт
      currentState = {};
    }

    states.push(currentState); // Додаємо поточний стан до результатів
  }

  return states;
}

module.exports = transformStateWithClones;

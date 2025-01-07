'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let currentState = { ...state }; // Создаем копию начального состояния

  for (const action of actions) {
    if (action.type === 'addProperties') {
      // Добавляем новые свойства
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      // Удаляем указанные ключи
      const { keysToRemove } = action;

      currentState = { ...currentState }; // Создаем копию

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      // Полностью очищаем состояние
      currentState = {};
    }

    // Добавляем текущее состояние в массив результатов
    resultStates.push(currentState);
  }

  return resultStates;
}

// function transformStateWithClones(state, actions) {
//   const results = [];
//   let currentState = { ...state }; // Створюємо копію початкового стану

//   for (const action of actions) {
//     switch (action.type) {
//       case 'clear':
//         currentState = {}; // Створюємо новий об'єкт
//         break;

//       case 'addProperties':
//         currentState = { ...currentState, ...action.extraData };
//         break;

//       case 'removeProperties':
//         const { keysToRemove } = action;

//         currentState = { ...currentState }; // Створюємо копію

//         for (const key of keysToRemove) {
//           delete currentState[key];
//         }
//         break;

//       default:
//         throw new Error(`Unknown action type: ${action.type}`);
//     }

//     results.push(currentState); // Додаємо новий стан до результатів
//   }

//   return results;
// }

module.exports = transformStateWithClones;

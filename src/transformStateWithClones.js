'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  // Масив для зберігання історії станів
  const stateHistory = [];

  // Використовуємо змінну для зберігання поточного стану
  let state = { ...initialState }; // Створюємо копію початкового стану

  // Ітерація по кожній дії
  actions.forEach((action) => {
    let newState;

    // В залежності від типу дії обираємо відповідну операцію
    switch (action.type) {
      case 'clear':
        // Створення порожнього об'єкта стану
        newState = {};
        break;

      case 'addProperties':
        // Створення нового об'єкта стану з додаванням нових властивостей
        newState = { ...state, ...action.extraData };
        break;

      case 'removeProperties':
        // Створення нового об'єкта стану без вказаних властивостей
        newState = { ...state };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        // Якщо тип невідомий, просто копіюємо стан без змін
        newState = { ...state };
    }

    // Додаємо новий стан до історії
    stateHistory.push(newState);

    // Оновлюємо state для наступної операції, використовуючи нову змінну
    state = newState;
  });

  return stateHistory;
}

// // Приклад використання:
// const state = {
//   foo: 'bar',
//   bar: 'foo',
// };

// const stateHistory = transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: { name: 'Jim', hello: 'world' },
//   },
//   {
//     type: 'removeProperties',
//     keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties',
//     extraData: { another: 'one' },
//   },
// ]);

// console.log(stateHistory);
// // [
// //   { foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world' },
// //   { foo: 'bar', name: 'Jim' },
// //   { foo: 'bar', name: 'Jim', another: 'one' },
// // ]

module.exports = transformStateWithClones;

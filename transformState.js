function transformStateWithClones(state, actions) {
  // Ініціалізуємо масив для збереження історії станів
  const stateHistory = [];

  // Ініціалізуємо поточний стан як копію початкового стану
  let currentState = { ...state };

  // Проходимо через всі дії в масиві
  actions.forEach(action => {
    let newState;

    switch (action.type) {
      case 'clear':
        // Створюємо порожній об'єкт для clear
        newState = {};
        break;
      case 'addProperties':
        // Додаємо нові властивості з extraData
        newState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        // Створюємо новий об'єкт без зазначених властивостей
        newState = { ...currentState };
        action.keysToRemove.forEach(key => {
          delete newState[key];
        });
        break;
      default:
        // Якщо тип дії не підтримується, просто повертаємо поточний стан
        newState = { ...currentState };
    }

    // Додаємо новий стан в історію
    stateHistory.push(newState);

    // Оновлюємо поточний стан для наступної ітерації
    currentState = newState;
  });

  return stateHistory;
}

// Тестові дані для перевірки
const state = {
  foo: 'bar',
  bar: 'foo',
};

const stateHistory = transformStateWithClones(state, [
  {
    type: 'addProperties',
    extraData: { name: 'Jim', hello: 'world' },
  },
  {
    type: 'removeProperties',
    keysToRemove: ['bar', 'hello'],
  },
  {
    type: 'addProperties',
    extraData: { another: 'one' },
  },
]);

console.log(stateHistory);

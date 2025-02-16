function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Клонуємо початковий state
  let history = []; // Масив для збереження історії станів

  for (let action of actions) {
    if (action.type === "clear") {
      currentState = {}; // Очищуємо стан
    } else if (action.type === "addProperties") {
      currentState = { ...currentState, ...action.extraData }; // Додаємо нові властивості
    } else if (action.type === "removeProperties") {
      currentState = { ...currentState }; // Створюємо клон перед змінами
      action.keysToRemove.forEach((key) => delete currentState[key]); // Видаляємо вказані ключі
    }
    history.push({ ...currentState }); // Додаємо новий стан у історію
  }

  return history;
}

// Приклад використання:
const state = {
  foo: "bar",
  bar: "foo",
};

const stateHistory = transformStateWithClones(state, [
  { type: "addProperties", extraData: { name: "Jim", hello: "world" } },
  { type: "removeProperties", keysToRemove: ["bar", "hello"] },
  { type: "addProperties", extraData: { another: "one" } },
]);

console.log(stateHistory);

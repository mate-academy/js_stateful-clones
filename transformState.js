function transformStateWithClones(state, actions) {
  const stateHistory = []; // Массив для хранения состояний
  let currentState = { ...state }; // Клонируем начальное состояние

  actions.forEach(action => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Обнуляем состояние
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData }; // Добавляем свойства
        break;
      case 'removeProperties':
        currentState = { ...currentState }; // Клонируем текущее состояние
        if (action.keysToRemove) {
          action.keysToRemove.forEach(key => {
            delete currentState[key]; // Удаляем указанные свойства
          });
        }
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`); // Обработка неизвестного типа
    }
    // Добавляем текущее состояние в историю
    stateHistory.push({ ...currentState });
  });

  return stateHistory; // Возвращаем историю состояний
}

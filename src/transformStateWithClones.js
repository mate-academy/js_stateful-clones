const ACTION_TYPES = {
  CLEAR: 'clear',
  ADD_PROPERTIES: 'addProperties',
  REMOVE_PROPERTIES: 'removeProperties',
};

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    // Обработка действия clear: создаем пустой объект
    if (action.type === ACTION_TYPES.CLEAR) {
      currentState = {};
      stateHistory.push({ ...currentState });
      continue;
    }

    if (action.type === ACTION_TYPES.ADD_PROPERTIES) {
      currentState = { ...currentState, ...action.extraData };
      stateHistory.push({ ...currentState });
      continue;
    }

    if (action.type === ACTION_TYPES.REMOVE_PROPERTIES) {
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
      stateHistory.push({ ...currentState });
      continue;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

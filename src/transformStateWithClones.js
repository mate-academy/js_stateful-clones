const ACTION_TYPES = {
  CLEAR: 'clear',
  ADD_PROPERTIES: 'addProperties',
  REMOVE_PROPERTIES: 'removeProperties',
};

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === ACTION_TYPES.CLEAR) {
      currentState = {};
    }

    if (action.type === ACTION_TYPES.ADD_PROPERTIES) {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === ACTION_TYPES.REMOVE_PROPERTIES) {
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

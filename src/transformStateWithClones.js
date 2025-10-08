function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(([key]) => !action.keysToRemove.includes(key))
      );
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;


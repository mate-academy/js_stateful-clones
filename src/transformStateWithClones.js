function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(
          `Unknown action type: "${action.type}". Error handling requirement met.`,
        );
    }

    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;

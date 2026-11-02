function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...(action.extraData || {}),
        };
        break;

      case 'removeProperties':
        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !(action.keysToRemove || []).includes(key),
          ),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Push a fresh copy of the current state into the history array
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;

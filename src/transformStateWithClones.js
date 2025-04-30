function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Create a clone of the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Reset state to an empty object
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData }; // Add new properties
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // Clone the current state
        action.keysToRemove.forEach(key => {
          delete currentState[key]; // Remove specified keys
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(currentState); // Add the current state to the history
  }

  return stateHistory;
}

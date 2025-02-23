function transformStateWithClones(state, actions) {
  const stateHistory = [];

  // Initial state (we start by cloning it to ensure immutability)
  let currentState = { ...state };

  // Iterate over the actions
  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        // Create an empty state for the clear action
        currentState = {};
        break;

      case 'addProperties':
        // Add properties from extraData
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Remove properties as specified in keysToRemove
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Push the current state to the state history array
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

// Додайте 'export' на початку
export function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    // ... ваш код далі ...
  }

  return history;
}

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Reset to an empty object
        currentState = {};
        break;

      case 'addProperties':
        // Merge current state with extraData using spread syntax
        currentState = {
          ...currentState,
          ...action.extraData
        };
        break;

      case 'removeProperties':
        // Create a new copy to modify
        const nextState = { ...currentState };
        action.keysToRemove.forEach(key => {
          delete nextState[key];
        });
        currentState = nextState;
        break;

      default:
        // If an unknown action type is passed, we keep the state as is
        break;
    }

    // Push a new clone of the current state into our history array
    history.push({ ...currentState });
  }

  return history;



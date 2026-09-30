function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }

        currentState = nextState;
        break;
      }

      default:
        break;
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;

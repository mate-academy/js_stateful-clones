function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let newState = { ...currentState };

    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;

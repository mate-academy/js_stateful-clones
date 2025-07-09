function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    } else {
      newState = { ...currentState };
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    currentState = newState;
    history.push(newState);
  }

  return history;
}

module.exports = transformStateWithClones;

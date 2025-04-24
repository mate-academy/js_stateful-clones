function transformStateWithClones(state, actions) {
  const result = [];
  let oldState = { ...state };

  for (const action of actions) {
    let newState;

    if (action.type === 'addProperties') {
      newState = { ...oldState };

      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
      result.push(newState);
      oldState = newState;
    }

    if (action.type === 'removeProperties') {
      newState = { ...oldState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      result.push(newState);
      oldState = newState;
    }

    if (action.type === 'clear') {
      newState = { ...oldState };

      for (const key in newState) {
        delete newState[key];
      }
      result.push(newState);
      oldState = newState;
    }
  }

  return result;
}

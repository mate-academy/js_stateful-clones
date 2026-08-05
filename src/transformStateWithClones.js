function transformStateWithClones(state, actions) {
  let clone = Object.assign({}, state);
  const states = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      clone = Object.assign({}, clone, extraData);
    }

    if (type === 'removeProperties') {
      clone = Object.assign({}, clone);

      for (const key of keysToRemove) {
        delete clone[key];
      }
    }

    if (type === 'clear') {
      clone = {};
    }

    states.push(clone);
  }

  return states;
}

module.exports = transformStateWithClones;

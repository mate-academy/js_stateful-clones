function transformStateWithClones(initialState, actions) {
  const history = [];
  let current = { ...initialState };

  for (const action of actions) {
    if (!action || !action.type) {
      continue;
    }

    switch (action.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = { ...current, ...(action.extraData || {}) };
        break;

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove || [];

        current = Object.keys(current).reduce((acc, key) => {
          if (!keysToRemove.includes(key)) {
            acc[key] = current[key];
          }

          return acc;
        }, {});
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(current);
  }

  return history;
}

module.exports = transformStateWithClones;

// eslint-disable-next-line no-unused-vars
function ransformStateWithClones(state, actions) {
  const results = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
    }

    results.push({ ...stateCopy }); // Важливо: пушимо копію!
  }

  return results;
}

'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'clear') {
      const keys = Object.keys(stateCopy);

      keys.forEach((key) => delete stateCopy[key]);
    }

    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

module.exports = transformStateWithClones;

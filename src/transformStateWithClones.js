'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key2 of action.keysToRemove) {
          delete stateCopy[key2];
        }
        break;

      case 'clear':
        for (const key3 in stateCopy) {
          delete stateCopy[key3];
        }
        break;

      default:
        break;
    }
    currentState = stateCopy;
    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

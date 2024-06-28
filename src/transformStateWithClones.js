'use strict';

function transformStateWithClones(state, actions) {
  const currentState = Object.assign({}, state);
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    switch (type) {
      case 'clear':
        for (const el in currentState) {
          delete currentState[el];
        }
        break;

      case 'addProperties':
        Object.assign(currentState, actions[i].extraData);
        break;

      case 'removeProperties':
        const keysToRemove = actions[i].keysToRemove;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }

    arr.push(Object.assign({}, currentState));
  }

  return arr;
}

module.exports = transformStateWithClones;

'use strict';

function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    if (type === 'clear') {
      for (const el in newState) {
        delete newState[el];
      }
    }

    if (type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
    }

    if (type === 'removeProperties') {
      const keysToRemove = actions[i].keysToRemove;

      for (const key of keysToRemove) {
        delete newState[key];
      }
    }
    arr.push(Object.assign({}, newState));
  }

  return arr;
}

module.exports = transformStateWithClones;

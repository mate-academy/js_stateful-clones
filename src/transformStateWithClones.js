'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const states = [];

  let currentState = stateCopy;

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
      states.push(currentState);
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      states.push(currentState);
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      states.push(currentState);
    }
  }

  return states;
}

module.exports = transformStateWithClones;

/* const obj = { a: 1, b: 2, c: 3 };

for (const k of ["a", "c"]) {
  delete obj[k];
}
 obj теперь { b: 2 } */

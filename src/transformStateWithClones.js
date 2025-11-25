'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };   // start with a clone of the initial state
  const history = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {}; // new empty object
    }else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }else if (action.type === 'removeProperties') {
      const newState = { ...currentState };
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }

    history.push({ ...currentState }); // push a *clone* into result
  }

  return history;
}

module.exports = transformStateWithClones;

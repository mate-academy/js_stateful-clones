'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfState = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    arrayOfState.push({ ...currentState });
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;

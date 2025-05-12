'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const newState = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete currentState[action.keysToRemove[i]];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;

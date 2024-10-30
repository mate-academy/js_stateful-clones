'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };
      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete currentState[action.keysToRemove[j]];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

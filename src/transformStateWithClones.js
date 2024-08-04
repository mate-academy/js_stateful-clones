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
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (let k = 0; k < action.keysToRemove.length; k++) {
        const key = action.keysToRemove[k];

        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

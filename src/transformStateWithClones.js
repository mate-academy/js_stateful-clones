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
    let nextState;

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      // eslint-disable-next-line max-len
      nextState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      nextState = { ...currentState };

      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete nextState[action.keysToRemove[j]];
      }
    }

    states.push(nextState);
    // eslint-disable-next-line max-len
    currentState = nextState;
  }

  return states;
}

module.exports = transformStateWithClones;

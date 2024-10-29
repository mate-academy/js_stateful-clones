'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const addProperties = 'addProperties';
const removeProperties = 'removeProperties';
const clear = 'clear';

function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case clear:
        nextState = {};
        break;

      case addProperties:
        nextState = { ...currentState, ...action.extraData };
        break;
      case removeProperties:
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        continue;
    }

    states.push(nextState);
    currentState = nextState;
  }

  return states;
}

module.exports = transformStateWithClones;

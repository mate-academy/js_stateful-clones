'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  let currentState = { ...state };

  for (const action of actions) {
    let nextState = {};

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        nextState = { ...currentState };
        break;
    }

    currentState = nextState;

    resultStates.push(currentState);
  }

  return resultStates;
}
module.exports = transformStateWithClones;

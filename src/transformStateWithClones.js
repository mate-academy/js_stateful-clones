'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultingStates = [];
  let currentState = state;

  for (const action of actions) {
    let nextState;
    const baseState = structuredClone(currentState);

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...baseState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...baseState };

        if (Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => {
            delete nextState[key];
          });
        }
        break;

      default:
        nextState = baseState; // If unrecognized, state doesn't change
    }
    currentState = nextState;
    resultingStates.push(currentState);
  }

  return resultingStates;
}

module.exports = transformStateWithClones;

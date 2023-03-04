'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedStates = [];
  let currentState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    let nextState;

    switch (type) {
      case 'addProperties':
        nextState = {
          ...currentState, ...extraData,
        };
        break;
      case 'removeProperties':
        nextState = {};

        for (const [key, value] of Object.entries(currentState)) {
          if (!keysToRemove.includes(key)) {
            nextState[key] = value;
          }
        }

        break;
      case 'clear':
        nextState = {};
        break;
      default:
        return 'Unknown action type';
    }

    clonedStates.push(nextState);
    currentState = nextState;
  }

  return clonedStates;
}

module.exports = transformStateWithClones;

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
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = Object.fromEntries(
          Object.entries(nextState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    resultStates.push(nextState);
    currentState = nextState;
  }

  return resultStates;
}

module.exports = transformStateWithClones;

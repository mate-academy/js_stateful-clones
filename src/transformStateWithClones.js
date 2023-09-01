'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState;

    switch (type) {
      case 'addProperties':
        nextState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };
        keysToRemove.forEach((key) => delete nextState[key]);
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error('Unexpected action type');
    }
    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;

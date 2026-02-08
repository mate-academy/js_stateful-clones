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
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...nextState });
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;

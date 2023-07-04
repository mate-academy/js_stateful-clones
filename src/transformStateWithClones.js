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
    const { type } = action;
    let updatedState;

    switch (type) {
      case 'addProperties': {
        const { extraData } = action;

        updatedState = {
          ...currentState, ...extraData,
        };
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        updatedState = { ...currentState };
        keysToRemove.forEach((key) => delete updatedState[key]);
        break;
      }

      case 'clear':
        updatedState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    result.push(updatedState);
    currentState = updatedState;
  }

  return result;
}

module.exports = transformStateWithClones;

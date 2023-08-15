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

    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        currentState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;
        const newState = { ...currentState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;

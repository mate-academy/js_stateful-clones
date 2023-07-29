'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties': {
        const { extraData } = action;

        clonedState = {
          ...clonedState,
          ...extraData,
        };
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete clonedState[key];
        }
        break;
      }
      case 'clear':
        clonedState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;

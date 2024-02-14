'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedState = {
          ...clonedState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        clonedState = { ...clonedState };

        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        clonedState = {};

        break;

      default: throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push(clonedState);
  }

  return result;
}

module.exports = transformStateWithClones;

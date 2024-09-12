'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const resultState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(prop => delete newState[prop]);
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error('Unknown action type:');
    }

    resultState[resultState.length] = { ...newState };
  }

  return resultState;
}

module.exports = transformStateWithClones;

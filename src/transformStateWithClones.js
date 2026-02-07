'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];

  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};

        break;

      case 'addProperties':
        newState = { ...currentState, ...action.extraData };

        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;

      default:
        newState = { ...currentState };
        break;
    }

    results.push(newState);
    currentState = newState;
  }

  return results;
}

module.exports = transformStateWithClones;

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

  actions.forEach((action) => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    results.push(newState);
    currentState = newState;
  });

  return results;
}

module.exports = transformStateWithClones;

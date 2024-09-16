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

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;
    let newState;

    switch (type) {
      case 'addProperties':
        newState = Object.assign({}, currentState, extraData);
        break;
      case 'removeProperties':
        newState = { ...currentState };
        keysToRemove.forEach(key => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Invalid action type: ${type}`);
    }

    result.push(newState);
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;

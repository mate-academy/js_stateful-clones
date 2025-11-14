'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
};

module.exports = transformStateWithClones;

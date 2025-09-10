'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let temporaryState = { ...state };

  for (const action of actions) {
    let newState = { ...temporaryState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(newState, action.extraData);
        }
        break;

      case 'removeProperties':
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];

        for (const keyState of keys) {
          delete newState[keyState];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type`);
    }

    states.push({ ...newState });
    temporaryState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;

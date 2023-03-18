'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const filteredState = {};

        for (const key of Object.keys(currentState)) {
          if (!action.keysToRemove.includes(key)) {
            filteredState[key] = currentState[key];
          }
        }
        currentState = filteredState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;

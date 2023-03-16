'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [state];
  let currentState = state;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        const filteredState = {};

        for (const [key, value] of Object.entries(currentState)) {
          if (!action.keysToRemove.includes(key)) {
            filteredState[key] = value;
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

  return states.slice(1);
}

module.exports = transformStateWithClones;

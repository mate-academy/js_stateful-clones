'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [state];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;
        const newState = {};

        for (const [key, value] of Object.entries(currentState)) {
          if (!keysToRemove.includes(key)) {
            newState[key] = value;
          }
        }

        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    states.push({ ...currentState });
  }

  return states.slice(1);
}


module.exports = transformStateWithClones;

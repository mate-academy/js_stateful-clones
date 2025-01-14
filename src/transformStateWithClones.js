'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  let clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedState = { ...clonedState, ...action.extraData };
        break;

      case 'removeProperties':
        const newState = {};

        for (const key in clonedState) {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = clonedState[key];
          }
        }
        clonedState = newState;
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...clonedState });
  }

  return states;
}

module.exports = transformStateWithClones;

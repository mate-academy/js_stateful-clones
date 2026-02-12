'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        {
          const tempState = { ...newState };

          for (const key of action.keysToRemove) {
            delete tempState[key];
          }
          newState = tempState;
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;

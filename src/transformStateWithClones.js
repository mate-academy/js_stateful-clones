'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultState = [];
  let tempState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }
        break;

      case 'clear':
        tempState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    const newState = { ...tempState };

    resultState.push(newState);
    // newState = {};
  }

  return resultState;
}

module.exports = transformStateWithClones;

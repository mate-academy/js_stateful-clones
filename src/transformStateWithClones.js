'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const finalState = [];
  let modState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modState, action.extraData);
        finalState.push({ ...modState });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete modState[key]);
        finalState.push({ ...modState });
        break;
      case 'clear':
        modState = {};
        finalState.push({ ...modState });
        break;
      default:
    }
  }

  return finalState;
}

module.exports = transformStateWithClones;

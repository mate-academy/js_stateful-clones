'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete currentState[remove];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;

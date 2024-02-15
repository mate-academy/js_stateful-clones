'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneStates = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extra = action.extraData;

        for (const data in extra) {
          currentState[data] = extra[data];
        }
        cloneStates.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }
        cloneStates.push({ ...currentState });
        break;

      case 'clear':
        Object.keys(currentState).forEach(key => delete currentState[key]);
        cloneStates.push({ ...currentState });
        break;

      default:
        break;
    }
  }

  return cloneStates;
}

module.exports = transformStateWithClones;

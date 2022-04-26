'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;
      case 'clear':
        Object.keys(clonedState).forEach(key => delete
        clonedState[key]);

        break;

      default:
        break;
    }
    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;

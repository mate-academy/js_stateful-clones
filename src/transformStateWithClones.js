'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
//
//

function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const result = [];

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
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;

      default:
        throw new Error('Unknown action type');
    }
    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;

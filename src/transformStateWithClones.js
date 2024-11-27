'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const cloneActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete cloneState[value];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        throw new Error('Invalid action type');
    }
    cloneActions.push({ ...cloneState });
  }

  return cloneActions;
}

module.exports = transformStateWithClones;

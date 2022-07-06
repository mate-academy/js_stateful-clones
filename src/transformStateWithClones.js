'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = Object.assign({}, state);
  const clonedStatesAfterTransforming = [];

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
        throw new Error('this doesn\'t run');
    }
    clonedStatesAfterTransforming.push({ ...clonedState });
  }

  return clonedStatesAfterTransforming;
}

module.exports = transformStateWithClones;

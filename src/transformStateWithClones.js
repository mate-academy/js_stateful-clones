'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const createdClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(createdClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete createdClone[key];
        }
        break;

      case 'clear':
        for (const value in createdClone) {
          delete createdClone[value];
        }
        break;

      default:
        break;
    }
    transformedState.push({ ...createdClone });
  }

  return transformedState;
}

module.exports = transformStateWithClones;

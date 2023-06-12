'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClonesList = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        throw new Error('Invalid action type');
    }

    stateClonesList.push({ ...stateClone });
  }

  return stateClonesList;
}

module.exports = transformStateWithClones;

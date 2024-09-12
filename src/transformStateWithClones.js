'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateChanges = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete stateClone[key]);
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      default:
        throw new Error('InvalidActionName');
    }
    stateChanges.push({ ...stateClone });
  }

  return stateChanges;
}

module.exports = transformStateWithClones;

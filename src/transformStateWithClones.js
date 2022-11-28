'use strict';

/**
 * @param {stateCopyect} state
 * @param {stateCopyect[]} actions
 *
 * @return {stateCopyect[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanges = [];

  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }
    stateChanges.push({ ...stateCopy });
  }

  return stateChanges;
}

module.exports = transformStateWithClones;

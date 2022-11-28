'use strict';

/**
 * @param {stateCopyect} state
 * @param {stateCopyect[]} actions
 *
 * @return {stateCopyect[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanges = [];

  stateChanges.push({ ...state });

  for (const action of actions) {
    let stateCopy = { ...stateChanges[stateChanges.length - 1] };

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
    stateChanges.push(stateCopy);
  }

  stateChanges.shift();

  return stateChanges;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesSnapshots = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        for (const stateCopyKey of Object.keys(stateCopy)) {
          delete stateCopy[stateCopyKey];
        }
        break;

      default:
        throw new Error('Incorrect action type.');
    }

    statesSnapshots.push({ ...stateCopy });
  }

  return statesSnapshots;
}

module.exports = transformStateWithClones;

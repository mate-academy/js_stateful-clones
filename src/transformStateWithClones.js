'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayOfStateCopy = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      default: break;
    }
    arrayOfStateCopy.push({ ...stateCopy });
  }

  return arrayOfStateCopy;
}

module.exports = transformStateWithClones;

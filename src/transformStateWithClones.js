'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;

      default:
        throw new Error(`Input is invalid - ${action.type}`);
    }

    clonesArray.push({ ...stateCopy });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const obgInAction of actions) {
    if (obgInAction.type === 'addProperties') {
      Object.assign(stateCopy, obgInAction.extraData);
    }

    if (obgInAction.type === 'removeProperties') {
      for (const keyForDelete of obgInAction.keysToRemove) {
        delete stateCopy[keyForDelete];
      }
    }

    if (obgInAction.type === 'clear') {
      for (const keyOfState in stateCopy) {
        delete stateCopy[keyOfState];
      }
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

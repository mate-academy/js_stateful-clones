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
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(stateCopy, extraData);
    }

    if (type === 'removeProperties') {
      for (const i of keysToRemove) {
        delete stateCopy[i];
      }
    }

    if (type === 'clear') {
      for (const property in stateCopy) {
        if (Object.hasOwnProperty.call(stateCopy, property)) {
          delete stateCopy[property];
        }
      }
    }

    clonesArray.push({ ...stateCopy });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;

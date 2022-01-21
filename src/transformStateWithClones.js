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
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const i of action.keysToRemove) {
        delete stateCopy[i];
      }
    }

    if (action.type === 'clear') {
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

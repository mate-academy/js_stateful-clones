'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clonedObject = { ...state };
  const stateHistory = [];

  actions.forEach((obj) => {
    if (obj.type === 'addProperties') {
      Object.assign(clonedObject, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      obj.keysToRemove.forEach((key) => {
        delete clonedObject[key];
      });
    }

    if (obj.type === 'clear') {
      Object.keys(clonedObject).forEach((key) => delete clonedObject[key]);
    }
    stateHistory.push({ ...clonedObject });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

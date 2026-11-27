'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  let objectClone = { ...state };

  for (const currentAction of actions) {
    objectClone = { ...objectClone };

    if (currentAction.type === 'addProperties') {
      for (const key in currentAction.extraData) {
        objectClone[key] = currentAction.extraData[key];
      }
    }

    if (currentAction.type === 'removeProperties') {
      for (const key of currentAction.keysToRemove) {
        delete objectClone[key];
      }
    }

    if (currentAction.type === 'clear') {
      objectClone = {};
    }

    arrayOfStates.push(objectClone);
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;

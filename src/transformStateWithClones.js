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

    switch (currentAction.type) {
      case 'addProperties':
        for (const key in currentAction.extraData) {
          objectClone[key] = currentAction.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of currentAction.keysToRemove) {
          delete objectClone[key];
        }
        break;

      case 'clear':
        objectClone = {};
        break;

      default:
        break;
    }

    arrayOfStates.push(objectClone);
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;

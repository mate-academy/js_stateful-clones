'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfActions = [];

  for (const action of actions) {
    const currentObject = listOfActions[listOfActions.length - 1] || state;
    const objectCopy = { ...currentObject };

    switch (action.type) {
      case 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete objectCopy[keyToRemove];
        }
        break;

      case 'clear':
        for (const objectCopyKey in objectCopy) {
          delete objectCopy[objectCopyKey];
        }
        break;

      default:
        break;
    }

    listOfActions.push(objectCopy);
  }

  return listOfActions;
}

module.exports = transformStateWithClones;

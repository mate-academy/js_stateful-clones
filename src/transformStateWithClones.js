'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  const newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToDelete of action.keysToRemove) {
          delete newObject[keyToDelete];
        }
        break;

      case 'clear':
        for (const clear in newObject) {
          delete newObject[clear];
        }
        break;

      default:
        throw new Error(`Unknow type of action: ${action.type}`);
    }

    newState.push({ ...newObject });
  }

  return newState;
}

module.exports = transformStateWithClones;

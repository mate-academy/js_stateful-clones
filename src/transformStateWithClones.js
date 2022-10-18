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
        for (const deleteKey of action.keysToRemove) {
          delete newObject[deleteKey];
        }
        break;

      case 'clear':
        for (const clear in newObject) {
          delete newObject[clear];
        }
        break;

      default:
        break;
    }

    newState.push({ ...newObject });
  }

  return newState;
}

module.exports = transformStateWithClones;

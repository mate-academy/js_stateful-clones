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
      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        };

        break;

      case 'addProperties':
        Object.assign(newObject, action.extraData);

        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newObject[keyToRemove];
        };

        break;

      default:
        throw new Error('Error');
    }

    newState.push({ ...newObject });
  }

  return newState;
}

module.exports = transformStateWithClones;

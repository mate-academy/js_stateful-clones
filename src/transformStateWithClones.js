'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newObject = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateCopy[keyRemove];
        }

        break;

      case 'clear':
        for (const keyClear in stateCopy) {
          delete stateCopy[keyClear];
        }

        break;

      default:
        throw new Error('error');
    }

    newObject.push({ ...stateCopy });
  }

  return newObject;
}

module.exports = transformStateWithClones;

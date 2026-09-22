'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objects = [];

  for (const action of actions) {
    const stateCopy =
      objects.length === 0 ? { ...state } : { ...objects[objects.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
    }

    objects.push(stateCopy);
  }

  return objects;
}

module.exports = transformStateWithClones;

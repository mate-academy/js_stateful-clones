'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const transformedState = [];

  for (const { type,
    extraData: propertiesToAdd,
    keysToRemove: propertiesToDelete } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, propertiesToAdd);
        break;

      case 'removeProperties':
        for (const toRemove of propertiesToDelete) {
          delete stateCopy[toRemove];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }
    transformedState.push({ ...stateCopy });
  }

  return transformedState;
}

module.exports = transformStateWithClones;

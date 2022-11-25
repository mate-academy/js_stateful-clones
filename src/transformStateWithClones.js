'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  for (const { type,
    extraData: propertiesToAdd,
    keysToRemove: propertiesToDelete } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, propertiesToAdd);
        break;

      case 'removeProperties':
        for (const key of propertiesToDelete) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;

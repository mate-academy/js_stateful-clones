'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };

  const result = [];

  for (const step of actions) {
    switch (step.type) {
      case 'addProperties':
        Object.assign(stateCopy, step.extraData);
        break;

      case 'removeProperties':
        const keysToDelete = step.keysToRemove;

        for (const key of keysToDelete) {
          delete stateCopy[key];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw Error;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

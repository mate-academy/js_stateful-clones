'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const outputParameters = [];
  let initialData = { ...state };

  for (const { type,
    extraData: propertiesToAdd,
    keysToRemove: propertiesToDelete } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(initialData, propertiesToAdd);
        break;

      case 'removeProperties':
        for (const key of propertiesToDelete) {
          delete initialData[key];
        }
        break;

      case 'clear':
        initialData = {};
        break;

      default:
        break;
    }

    outputParameters.push({ ...initialData });
  }

  return outputParameters;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const previousChanges = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      default:
        break;
    }

    previousChanges.push({ ...stateCopy });
  });

  return previousChanges;
}

module.exports = transformStateWithClones;

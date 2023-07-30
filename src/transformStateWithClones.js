'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const previousChanges = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete copy[key]);
        break;

      case 'clear':
        Object.keys(copy).forEach((key) => delete copy[key]);
        break;

      default:
        break;
    }

    previousChanges.push({ ...copy });
  });

  return previousChanges;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentStateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentStateCopy = {};
        break;
      case 'addProperties':
        currentStateCopy = { ...currentStateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete currentStateCopy[key]);
        break;
      default:
        break;
    }

    result.push({ ...currentStateCopy });
  });

  return result;
}

module.exports = transformStateWithClones;

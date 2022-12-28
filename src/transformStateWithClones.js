'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateCopies = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        for (const item in stateCopy) {
          delete stateCopy[item];
        }
        break;
      default:
        break;
    }
    stateCopies.push({ ...stateCopy });
  }

  return stateCopies;
}

module.exports = transformStateWithClones;

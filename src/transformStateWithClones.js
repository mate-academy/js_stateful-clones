'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const log = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      default:
        throw new Error('something is wrong');
    }

    log.push({ ...stateCopy });
  }

  return log;
}

module.exports = transformStateWithClones;

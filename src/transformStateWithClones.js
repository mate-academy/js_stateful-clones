'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const versionOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;

      default:
        break;
    }

    versionOfState.push({ ...stateCopy });
  }

  return versionOfState;
}

module.exports = transformStateWithClones;

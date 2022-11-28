'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionsOfState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((keyToRemove) => {
          delete stateCopy[keyToRemove];
        });
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((keytoClear) => {
          delete stateCopy[keytoClear];
        });
        break;

      default:
        break;
    }

    versionsOfState.push({ ...stateCopy });
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;

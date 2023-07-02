'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const versionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const KeyToRemove of action.keysToRemove) {
          delete stateCopy[KeyToRemove];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          if (key) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        throw new Error('Unexpected action type');
    }
    versionsOfState.push({ ...stateCopy });
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;

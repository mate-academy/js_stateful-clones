'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *action
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateCopy[key]) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('Unknown type');
    }

    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }
        break;
      }

      case 'clear': {
        Object.keys(stateCopy).forEach(remove => delete stateCopy[remove]);
        break;
      }

      default: {
        result.push({ ...stateCopy });
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;

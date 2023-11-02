'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  const stateCopy = { ...state };

  for (const action of actions) {

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        return 'broken data - input right data';
    }
    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;

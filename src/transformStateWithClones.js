'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArr = [];
  const stateCopy = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of item.keysToRemove) {
          if (stateCopy.hasOwnProperty(keyToRemove)) {
            delete stateCopy[keyToRemove];
          }
        }
        break;

      case 'clear':
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;

      default: {
        return 'An error occured';
      }
    }

    resultArr.push({ ...stateCopy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;

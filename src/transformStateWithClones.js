'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const actionsCopy = [];
  const stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;

      default:
        throw new Error('Not supported action type');
    }
    actionsCopy.push({ ...stateCopy });
  }

  return actionsCopy;
}

module.exports = transformStateWithClones;

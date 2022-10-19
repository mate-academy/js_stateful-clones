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
  const array = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        array.push({ ...stateCopy });
        break;

      case 'removeProperties':
        const removeValues = actions[i].keysToRemove;

        for (const toRemove of removeValues) {
          for (const keys in stateCopy) {
            if (toRemove === keys) {
              delete stateCopy[keys];
            }
          }
        }
        array.push({ ...stateCopy });
        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        array.push({ ...stateCopy });
        break;

      default:
        return array;
    }
  }

  return array;
}

module.exports = transformStateWithClones;

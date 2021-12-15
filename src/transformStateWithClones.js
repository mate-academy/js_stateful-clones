'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateCopiesArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyName of action.keysToRemove) {
          if (stateCopy.hasOwnProperty([keyName])) {
            delete stateCopy[keyName];
          }
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
    }

    stateCopiesArr.push({ ...stateCopy });
  }

  return stateCopiesArr;
}

module.exports = transformStateWithClones;

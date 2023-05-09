'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }
        break;

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;

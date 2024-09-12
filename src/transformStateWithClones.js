'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete stateCopy[item];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return null;
    }
    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;

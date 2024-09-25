'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      default:
        stateCopy = {};
    }
    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;

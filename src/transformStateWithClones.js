'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          stateCopy[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    transformHistory.push({ ...stateCopy });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;

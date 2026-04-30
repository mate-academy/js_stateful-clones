'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const props of action.keysToRemove) {
          delete stateCopy[props];
        }
        break;
      default:
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

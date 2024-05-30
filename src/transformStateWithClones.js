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
      case 'addProperties':
        for (const entry of Object.entries(action.extraData)) {
          stateCopy[entry[0]] = entry[1];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

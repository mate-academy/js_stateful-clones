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
    stateCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(stateCopy, action.extraData);
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

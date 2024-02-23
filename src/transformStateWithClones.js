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
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const prop of Object.keys(stateCopy)) {
          if (stateCopy[prop]) {
            delete stateCopy[prop];
          }
        }
        break;

      default:
        return `Unexpected ${action.type}`;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

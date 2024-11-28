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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
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
        return `Unexpected ${actions[i].type}`;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

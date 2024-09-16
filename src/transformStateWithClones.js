'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

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
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      default:
        return `Unknown action type: ${action.type}`;
    }
    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;

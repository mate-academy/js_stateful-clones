'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        result.push();
        break;
      case 'removeProperties':
        for (const removeElement of action.keysToRemove) {
          delete stateCopy[removeElement];
        }
        break;
      case 'clear':
        for (const element in stateCopy) {
          delete stateCopy[element];
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

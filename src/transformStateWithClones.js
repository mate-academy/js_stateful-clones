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

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < obj.keysToRemove.length; i++) {
          delete stateCopy[obj.keysToRemove[i]];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('Unknown action');
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

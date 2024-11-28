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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of Object.keys(keysToRemove)) {
          delete stateCopy[keysToRemove[key]];
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          if (stateCopy[key]) {
            delete stateCopy[key];
          }
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

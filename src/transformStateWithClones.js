'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        const array = action.keysToRemove;

        for (const item of array) {
          if (stateCopy[item] !== undefined) {
            delete stateCopy[item];
          }
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;

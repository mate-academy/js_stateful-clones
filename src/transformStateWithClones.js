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
        for (const data in action.extraData) {
          stateCopy[data] = action.extraData[data];
        }
        result.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in stateCopy) {
            delete stateCopy[keyToRemove];
          }
        }
        result.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        result.push({ ...stateCopy });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

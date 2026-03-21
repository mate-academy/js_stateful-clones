'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const object of actions) {
    if (object.type === 'addProperties') {
      for (const value in object.extraData) {
        stateCopy[value] = object.extraData[value];
      }
      result.push({ ...stateCopy });
    } else if (object.type === 'removeProperties') {
      for (const value of object.keysToRemove) {
        delete stateCopy[value];
      }
      result.push({ ...stateCopy });
    } else if (object.type === 'clear') {
      for (const value in stateCopy) {
        delete stateCopy[value];
      }
      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;

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

  for (const property of actions) {
    if (property.type === 'addProperties') {
      Object.assign(stateCopy, property.extraData);
    }

    if (property.type === 'removeProperties') {
      for (const key of property.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (property.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

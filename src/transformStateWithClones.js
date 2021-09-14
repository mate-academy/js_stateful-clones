'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };
  const array = [];

  for (const value of actions) {
    if (value.type === 'addProperties') {
      Object.assign(stateCopy, value.extraData);
    }

    if (value.type === 'removeProperties') {
      for (const removeValue of value.keysToRemove) {
        delete stateCopy[`${removeValue}`];
      }
    }

    if (value.type === 'clear') {
      for (const clearKey in stateCopy) {
        if (stateCopy.hasOwnProperty(clearKey)) {
          delete stateCopy[clearKey];
        }
      }
    }

    array.push({ ...stateCopy });
  }

  return array;
}

module.exports = transformStateWithClones;

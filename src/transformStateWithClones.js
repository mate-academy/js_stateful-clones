'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const options = Object.values(actions);
  const result = [];
  const stateCopy = { ...state };

  for (const option of options) {
    const { keysToRemove, type, extraData } = option;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        result.push({ ...stateCopy });
        break;

      case 'removeProperties':
        removeProp(keysToRemove, stateCopy);
        result.push({ ...stateCopy });
        break;

      default:
        removeProp(stateCopy, stateCopy);
        result.push({ ...stateCopy });
    }
  }

  return result;
}

function removeProp(properties, stateCopy) {
  for (const key in properties) {
    if (properties.length) {
      delete stateCopy[properties[key]];
    } else {
      delete stateCopy[key];
    }
  }
}

module.exports = transformStateWithClones;

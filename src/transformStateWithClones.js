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

  for (const type of actions) {
    switch (type.type) {
      case 'addProperties':
        Object.assign(stateCopy, type.extraData);

        result.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const key of type.keysToRemove) {
          delete stateCopy[key];
        }

        result.push({ ...stateCopy });
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => (delete stateCopy[key]));

        result.push({ ...stateCopy });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = {
    ...state,
  };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateCopy, key.extraData);

        break;
      case 'removeProperties':
        for (const remove of key.keysToRemove) {
          delete stateCopy[remove];
        }
        break;
      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // create copy to protect input data from changes
  const stateCopy = { ...state };
  const result = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          stateCopy[key] = item.extraData[key];
        };
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default: return 'Unknown action';
    }

    // пушимо через деструктурізацію
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

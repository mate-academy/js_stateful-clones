'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const e of actions) {
    switch (e.type) {
      case 'addProperties':
        Object.assign(stateCopy, e.extraData);
        break;
      case 'removeProperties':
        for (const key of e.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
      default:
        throw new Error();
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

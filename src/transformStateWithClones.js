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

  for (const impact of actions) {
    switch (impact.type) {
      case 'addProperties':
        Object.assign(stateCopy, impact.extraData);
        break;

      case 'removeProperties':

        for (const key of impact.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`${impact} is not supported`);
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

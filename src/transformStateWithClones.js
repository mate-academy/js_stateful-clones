'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const impact of actions) {
    switch (impact.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy };
        Object.assign(stateCopy, impact['extraData']);
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of impact.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

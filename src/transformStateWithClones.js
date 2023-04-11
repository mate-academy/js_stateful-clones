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

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`please, enter valid action type`);
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;

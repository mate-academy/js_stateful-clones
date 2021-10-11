'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = { ...state };
  const resultArray = [];

  for (const key in actions) {
    switch (actions[key].type) {
      case 'removeProperties':
        for (let i = 0; i < actions[key].keysToRemove.length; i++) {
          delete result[actions[key].keysToRemove[i]];
        }
        resultArray.push({ ...result });
        break;

      case 'addProperties':
        Object.assign(result, actions[key].extraData);
        resultArray.push({ ...result });
        break;

      case 'clear':
        for (const key2 in result) {
          delete result[key2];
        }
        resultArray.push({ ...result });
        break;

      default:
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;

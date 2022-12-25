'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let resultObject = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(resultObject, obj.extraData);
        break;

      case 'removeProperties':
        for (const prop of obj.keysToRemove) {
          delete resultObject[prop];
        }
        break;

      default:
        resultObject = {};
        break;
    }
    result.push({ ...resultObject });
  }

  return result;
}

module.exports = transformStateWithClones;

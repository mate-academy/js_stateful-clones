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
    if (obj.type === 'addProperties') {
      Object.assign(resultObject, obj.extraData);
      result.push({ ...resultObject });
    }

    if (obj.type === 'removeProperties') {
      for (const prop of obj.keysToRemove) {
        delete resultObject[prop];
      }
      result.push({ ...resultObject });
    }

    if (obj.type === 'clear') {
      resultObject = {};
      result.push({ ...resultObject });
    }
  }

  return result;
}

module.exports = transformStateWithClones;

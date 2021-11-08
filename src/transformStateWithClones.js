'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObj = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(newObj, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete newObj[key];
      }
    } else if (obj.type === 'clear') {
      newObj = {};
    }

    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;

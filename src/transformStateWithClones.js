'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const result = [];

  for (const item of actions) {
    if (item.type === 'addProperties') {
      newObj = {
        ...newObj, ...item.extraData,
      };
    }

    if (item.type === 'removeProperties') {
      for (const key of item.keysToRemove) {
        delete newObj[key];
      }
    }

    if (item.type === 'clear') {
      newObj = {};
    }
    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;

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
    switch (item.type) {
      case 'addProperties':
        newObj = {
          ...newObj, ...item.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        newObj = {};
    }

    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;

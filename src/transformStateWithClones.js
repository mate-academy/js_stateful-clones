'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let transformObj = { ...state };
  const result = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(transformObj, item.extraData);
        break;

      case 'removeProperties':
        for (const keys of item.keysToRemove) {
          delete transformObj[keys];
        }
        break;

      case 'clear':
        transformObj = {};
        break;
    }

    result.push({ ...transformObj });
  }

  return result;
}

module.exports = transformStateWithClones;

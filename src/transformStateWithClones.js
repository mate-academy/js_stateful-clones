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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete transformObj[key];
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

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
        for (const keys of action.keysToRemove) {
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

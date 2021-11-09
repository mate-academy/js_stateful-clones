'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyObject, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyObject[key];
        };
        break;
      case 'clear':
        copyObject = {};
        break;
    }

    result.push({ ...copyObject });
  }

  return result;
}

module.exports = transformStateWithClones;

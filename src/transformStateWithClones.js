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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        };
        break;
      case 'clear':
        newObj = {};
        break;
    }

    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const RESULT = [];
  let newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newObj = Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        newObj = {};
    }
    RESULT.push({ ...newObj });
  }

  return RESULT;
}

module.exports = transformStateWithClones;

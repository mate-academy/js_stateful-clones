'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const cloneObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneObj[key];
        }
        break;

      case 'clear':
        for (const key in cloneObj) {
          delete cloneObj[key];
        }
        break;
    }
    clone.push({ ...cloneObj });
  }

  return clone;
}

module.exports = transformStateWithClones;

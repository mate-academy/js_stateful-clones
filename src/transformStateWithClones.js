'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = [];
  const copyObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyObj, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          if (copyObj.hasOwnProperty(keys)) {
            delete copyObj[keys];
          }
        }
        break;

      case 'clear':
        for (const keys in copyObj) {
          delete copyObj[keys];
        }
        break;
    }

    copy.push({ ...copyObj });
  }

  return copy;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = [];
  let copyObj = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
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
        copyObj = {};
        break;

      default:
        copy.push({ ...copyObj });
        break;
    }

    copy.push({ ...copyObj });
  }

  return copy;
}

module.exports = transformStateWithClones;

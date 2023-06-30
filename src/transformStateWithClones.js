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
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyObj, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (copyObj.hasOwnProperty(key)) {
            delete copyObj[key];
          }
        }
        break;

      case 'clear':
        copyObj = {};
        break;

      default:
        break;
    }

    copy.push({ ...copyObj });
  }

  return copy;
}

module.exports = transformStateWithClones;

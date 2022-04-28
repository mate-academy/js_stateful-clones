'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyObj = { ...state };

  for (const key in actions) {
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(copyObj, actions[key].extraData);
        break;

      case 'removeProperties':
        for (const remove of actions[key].keysToRemove) {
          delete copyObj[remove];
        }
        break;

      case 'clear':
        for (const clear in copyObj) {
          delete copyObj[clear];
        }
        break;

      default:
        break;
    }

    result.push({ ...copyObj });
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let baseClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(baseClone, action.extraData);
        result.push({ ...baseClone });
        break;

      case 'removeProperties':
        removeData(baseClone, action.keysToRemove);
        result.push({ ...baseClone });
        break;

      case 'clear':
        baseClone = {};
        result.push({ ...baseClone });
        break;

      default:
        return `Unknown action type: ${action.type}`;
    }
  }

  function removeData(changedObj, removeDatas) {
    for (const data of removeDatas) {
      delete changedObj[data];
    }
  }

  return result;
}

module.exports = transformStateWithClones;

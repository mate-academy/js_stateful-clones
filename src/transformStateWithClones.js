'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const baseClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addData(baseClone, action.extraData);
        result.push({ ...baseClone });
        break;

      case 'removeProperties':
        removeData(baseClone, action.keysToRemove);
        result.push({ ...baseClone });
        break;

      case 'clear':
        clearData(baseClone);
        result.push({ ...baseClone });
        break;

      default:
        return `Unknown action type: ${action.type}`;
    }
  }

  function addData(changedObj, extraDatas) {
    Object.assign(changedObj, extraDatas);
  }

  function removeData(changedObj, removeDatas) {
    for (const data of removeDatas) {
      delete changedObj[data];
    }
  }

  function clearData(changedObj) {
    for (const key in changedObj) {
      delete changedObj[key];
    }
  }

  return result;
}

module.exports = transformStateWithClones;

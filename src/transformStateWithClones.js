'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultedArray = [];
  const currentObj = { ...state };
  const ACTION_CASES = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  for (const action of actions) {
    switch (action.type) {
      case ACTION_CASES.add:
        addProperties(currentObj, action.extraData);
        break;
      case ACTION_CASES.remove:
        removeProperties(currentObj, action.keysToRemove);
        break;
      case ACTION_CASES.clear:
        clearObj(currentObj);
        break;
      default: return 'Unknown command.';
    }

    resultedArray.push({ ...currentObj });
  }

  return resultedArray;
}

function addProperties(obj, extraData) {
  for (const key in extraData) {
    obj[key] = extraData[key];
  }

  return obj;
}

function removeProperties(obj, keyList = []) {
  for (const key of keyList) {
    delete obj[key];
  }

  return obj;
}

function clearObj(obj) {
  for (const key in obj) {
    delete obj[key];
  }

  return obj;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultedArray = [];
  let currentObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        resultedArray.push(addProperties(currentObj, action.extraData));
        currentObj = { ...resultedArray[resultedArray.length - 1] };
        break;
      case 'removeProperties':
        resultedArray.push(removeProperties(currentObj, action.keysToRemove));
        currentObj = { ...resultedArray[resultedArray.length - 1] };
        break;
      case 'clear':
        resultedArray.push(clearObj(currentObj));
        currentObj = { ...resultedArray[resultedArray.length - 1] };
        break;
    }
  }

  return resultedArray;
}

function addProperties(obj, extraData) {
  const newObj = { ...obj };

  for (const key in extraData) {
    newObj[key] = extraData[key];
  }

  return newObj;
}

function removeProperties(obj, keyList = []) {
  const newObj = { ...obj };

  for (const key of keyList) {
    delete newObj[key];
  }

  return newObj;
}

function clearObj(obj) {
  const newObj = { ...obj };

  for (const key in obj) {
    delete newObj[key];
  }

  return newObj;
}

module.exports = transformStateWithClones;

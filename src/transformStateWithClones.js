'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArr = [];
  let modObj = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        modObj = addProps(modObj, obj.extraData);
        break;

      case 'removeProperties':
        modObj = removeProps(modObj, obj.keysToRemove);
        break;

      case 'clear':
        modObj = clearObj(modObj);
    }
    finalArr.push(modObj);
  }

  return finalArr;
}

function addProps(data, extraData) {
  const obj = { ...data };

  Object.assign(obj, extraData);

  return obj;
}

function removeProps(data, keyToRemove) {
  const obj = { ...data };

  for (const key of keyToRemove) {
    delete obj[key];
  }

  return obj;
}

function clearObj(data) {
  const obj = { ...data };

  for (const key in obj) {
    delete obj[key];
  }

  return obj;
}

module.exports = transformStateWithClones;

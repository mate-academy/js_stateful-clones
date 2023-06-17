'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const typeAdd = 'addProperties';
    const typeRemove = 'removeProperties';
    const typeClear = 'clear';
    const newState = result.length === 0
      ? { ...state }
      : { ...(result[result.length - 1]) };

    switch (type) {
      case typeAdd:
        addProperties(newState, extraData);
        break;

      case typeRemove:
        removeValueByKey(newState, keysToRemove);
        break;

      case typeClear:
        clearObj(newState);
        break;

      default:
        break;
    }
    result.push(newState);
  }

  return result;
};

function addProperties(obj, data) {
  Object.assign(obj, data);
};

function removeValueByKey(obj, keys) {
  keys.forEach(key => delete obj[key]);
};

function clearObj(obj) {
  for (const key in obj) {
    delete obj[key];
  }
};

module.exports = transformStateWithClones;

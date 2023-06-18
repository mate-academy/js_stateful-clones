'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const typeAdd = 'addProperties';
  const typeRemove = 'removeProperties';
  const typeClear = 'clear';
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case typeAdd:
        addProperties(stateClone, extraData);
        break;

      case typeRemove:
        removeValueByKey(stateClone, keysToRemove);
        break;

      case typeClear:
        clearObj(stateClone);
        break;

      default:
        break;
    }
    result.push({ ...stateClone });
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

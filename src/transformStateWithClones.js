'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ACTION_TYPE_ADD_PROPERTIES = 'addProperties';
  const ACTION_TYPE_REMOVE_PROPERTIES = 'removeProperties';
  const ACTION_TYPE_CLEAR = 'clear';

  const changeableObj = { ...state };
  const objHistory = [];

  for (const obj of actions) {
    const type = obj.type;
    const extraData = obj.extraData;
    const keysToRemove = obj.keysToRemove;

    switch (type) {
      case ACTION_TYPE_ADD_PROPERTIES: {
        Object.assign(changeableObj, extraData);
        break;
      }

      case ACTION_TYPE_REMOVE_PROPERTIES: {
        for (const key of keysToRemove) {
          delete changeableObj[key];
        }
        break;
      }

      case ACTION_TYPE_CLEAR: {
        for (const key in changeableObj) {
          delete changeableObj[key];
        }
      }
    }

    objHistory.push({ ...changeableObj });
  }

  return objHistory;
}

module.exports = transformStateWithClones;

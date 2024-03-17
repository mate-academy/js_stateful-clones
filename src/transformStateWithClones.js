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

  let prevObject = { ...state };
  const objHistory = [];

  for (const obj of actions) {
    const currentObj = { ...prevObject };

    switch (obj.type) {
      case ACTION_TYPE_ADD_PROPERTIES: {
        Object.assign(currentObj, obj.extraData);
        break;
      }

      case ACTION_TYPE_REMOVE_PROPERTIES: {
        for (const key of obj.keysToRemove) {
          delete currentObj[key];
        }
        break;
      }

      case ACTION_TYPE_CLEAR: {
        for (const key in currentObj) {
          delete currentObj[key];
        }
      }
    }

    objHistory.push(currentObj);
    prevObject = { ...currentObj };
  }

  return objHistory;
}

module.exports = transformStateWithClones;

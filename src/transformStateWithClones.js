'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let prevObject = { ...state };
  const objHistory = [];

  for (const obj of actions) {
    const currentObj = { ...prevObject };

    switch (obj.type) {
      case 'addProperties': {
        Object.assign(currentObj, obj.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of obj.keysToRemove) {
          delete currentObj[key];
        }
        break;
      }

      case 'clear': {
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

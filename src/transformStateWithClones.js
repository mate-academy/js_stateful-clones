'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const logOfActions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(stateCopy, extraData);
        break;
      }

      case 'removeProperties': {
        removeKeys(stateCopy, keysToRemove);
        break;
      }

      case 'clear': {
        clearObject(stateCopy);
        break;
      }
      default:
        break;
    }
    logOfActions.push({ ...stateCopy });
  }

  return logOfActions;
}

/**
* @param {Object} clrObj
*/
function clearObject(clrObj) {
  for (const key in clrObj) {
    delete clrObj[key];
  }
}

/**
  * @param {Object} clrObj
  * @param {Array} keys
  */
function removeKeys(clrObj, keys) {
  for (const key of keys) {
    delete clrObj[key];
  }
}

module.exports = transformStateWithClones;

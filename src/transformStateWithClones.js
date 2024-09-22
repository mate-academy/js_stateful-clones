'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push({ ...addProperties(clone, action.extraData) });
        break;

      case 'removeProperties':
        stateHistory.push({ ...removeProperties(clone, action.keysToRemove) });
        break;

      case 'clear':
        stateHistory.push({ ...clearProperties(clone) });
        break;
    }
  }

  function addProperties(cloneObject, extraData) {
    Object.assign(cloneObject, extraData);

    return cloneObject;
  }

  function removeProperties(cloneObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete cloneObject[key];
    }

    return cloneObject;
  }

  function clearProperties(cloneObject) {
    for (const key in cloneObject) {
      delete cloneObject[key];
    }

    return cloneObject;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];

  const stateCopy = {};

  for (const { type, extraData, keysToRemove } of actions) {
    if (actionsArray.length === 0) {
      Object.assign(stateCopy, state);
    } else {
      clearProperties();
      Object.assign(stateCopy, actionsArray[actionsArray.length - 1]);
    }

    switch (type) {
      case 'addProperties':
        addProperties(extraData);
        break;
      case 'removeProperties':
        removeProperties(keysToRemove);
        break;
      case 'clear':
        clearProperties();
        break;
      default:
    }
    actionsArray.push({ ...stateCopy });
  }

  function addProperties(addProp) {
    for (const key in addProp) {
      stateCopy[key] = addProp[key];
    }
  }

  function removeProperties(removePorp) {
    for (const key of removePorp) {
      delete stateCopy[key];
    }
  }

  function clearProperties() {
    for (const key in stateCopy) {
      delete stateCopy[key];
    }
  }

  return actionsArray;
}

module.exports = transformStateWithClones;

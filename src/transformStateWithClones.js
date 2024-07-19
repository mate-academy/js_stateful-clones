'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData, actionsArray);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove, actionsArray);
        break;
      case 'clear':
        clear(actionsArray, stateCopy);
        break;
      default:
        clear(actionsArray, stateCopy);
        break;
    }
  }

  return actionsArray;
}

function clear(actionsArray, stateCopy) {
  for (const value in stateCopy) {
    delete stateCopy[value];
  }
  actionsArray.push({ ...stateCopy });
}

function addProperties(stateCopy, extraData, actionsArray) {
  const addCopy = {};

  Object.assign(stateCopy, extraData);
  Object.assign(addCopy, stateCopy);
  actionsArray.push({ ...addCopy });
}

function removeProperties(stateCopy, keysToRemove, actionsArray) {
  const removeCopy = {};

  for (const keyToRemove of keysToRemove) {
    delete stateCopy[keyToRemove];
  }
  Object.assign(removeCopy, stateCopy);
  actionsArray.push({ ...removeCopy });
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];
  const resultObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(resultObject, action.extraData, actionsArray);
        break;
      case 'removeProperties':
        removeProperties(resultObject, action.keysToRemove, actionsArray);
        break;
      case 'clear':
        clear(actionsArray, resultObject);
        break;
    }
  }

  return actionsArray;
}

function clear(actionsArray, resultObject) {
  for (const value in resultObject) {
    delete resultObject[value];
  }
  actionsArray.push({ ...resultObject });
}

function addProperties(resultObject, extraData, actionsArray) {
  Object.assign(resultObject, extraData);
  actionsArray.push({ ...resultObject });
}

function removeProperties(resultObject, keysToRemove, actionsArray) {
  for (const keyToRemove of keysToRemove) {
    delete resultObject[keyToRemove];
  }
  actionsArray.push({ ...resultObject });
}

module.exports = transformStateWithClones;

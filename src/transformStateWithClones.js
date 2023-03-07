'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const properties = {
    addProperties: 'addProperties',
    clear: 'clear',
    removeProperties: 'removeProperties',
  };
  const newObj = { ...state };
  let obj = {};
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case properties.addProperties:
        assignNewDataToState(newObj, action);
        obj = writeToArray(obj, newObj, newArray);
        break;

      case properties.removeProperties:
        for (const key of getRemoveKeys(action)) {
          deleteFromState(newObj, key);
        }
        obj = writeToArray(obj, newObj, newArray);
        break;

      case properties.clear:
        const keysState = getSateKeys(newObj);

        for (const key of keysState) {
          deleteFromState(newObj, key);
        }
        obj = writeToArray(obj, newObj, newArray);
        break;
    }
  }

  return newArray;
}

function writeToArray(newObject, obj, newArray) {
  let object = { ...obj };

  newArray.push(object);

  object = {};

  return object;
}

function assignNewDataToState(newObj, action) {
  Object.assign(newObj, action.extraData);
}

function deleteFromState(newObj, key) {
  delete newObj[key];
}

function getRemoveKeys(action) {
  return action.keysToRemove;
}

function getSateKeys(myObject) {
  return Object.keys(myObject);
}

module.exports = transformStateWithClones;

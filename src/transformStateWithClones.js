'use strict';

function transformStateWithClones(state, actions) {
  const arrayOfObjects = [];
  let newObject = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newObject[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newObject[key];
      }
    } else if (action.type === 'clear') {
      newObject = {};
    }
    arrayOfObjects.push({ ...newObject });
  }

  return arrayOfObjects;
}

module.exports = transformStateWithClones;

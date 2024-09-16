'use strict';

function transformStateWithClones(state, actions) {
  const arrayOfObjects = [];
  let newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newObject = Object.assign({}, newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObject[key];
        }
        break;

      case 'clear':
        newObject = {};
        break;

      default:
        break;
    }
    arrayOfObjects.push({ ...newObject });
  }

  return arrayOfObjects;
}

module.exports = transformStateWithClones;

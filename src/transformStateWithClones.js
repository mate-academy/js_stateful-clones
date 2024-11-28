'use strict';

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newArr = [];

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        Object.assign(stateCopy, value.extraData);
        break;
      case 'removeProperties':
        for (const key in value.keysToRemove) {
          const keyDel = value.keysToRemove[key];

          delete stateCopy[keyDel];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    newArr.push({ ...stateCopy });
  }

  return newArr;
}

module.exports = transformStateWithClones;

'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const arrClone = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const delKey of action.keysToRemove) {
          delete clone[delKey];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      default:
        return null;
    }

    const tempCLone = { ...clone };

    arrClone.push(tempCLone);
  }

  return arrClone;
}

module.exports = transformStateWithClones;



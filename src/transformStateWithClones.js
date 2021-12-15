'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = { ...state };
  const arrClone = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const delKey of action.keysToRemove) {
          delete cloneState[delKey];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        return null;
    }

    const tempCLone = { ...cloneState };

    arrClone.push(tempCLone);
  }

  return arrClone;
}

module.exports = transformStateWithClones;

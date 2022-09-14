'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const mainArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default:
        throw Error('unknown action type');
    }

    mainArray.push({ ...copy });
  }

  return mainArray;
}
module.exports = transformStateWithClones;

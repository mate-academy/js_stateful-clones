'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const resultArray = [];
  const duplicateState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(duplicateState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete duplicateState[key];
        }
        break;

      case 'clear':
        for (const key in duplicateState) {
          delete duplicateState[key];
        }
        break;

      default:
    }
    resultArray.push({ ...duplicateState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;

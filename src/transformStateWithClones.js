'use strict';
function transformStateWithClones(state, actions) {
  const current = { ...state };
  const resultingArray = [];
  let i = 0;

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(current, key.extraData);
        break;

      case 'removeProperties':

        for (const property of key.keysToRemove) {
          delete current[property];
        }
        break;

      case 'clear':
        for (const property in current) {
          delete current[property];
        }
        break;

      default:

        return state;
    }

    resultingArray[i] = { ...current };
    i++;
  }

  return resultingArray;
}

module.exports = transformStateWithClones;


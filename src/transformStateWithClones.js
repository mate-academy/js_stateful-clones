'use strict';
function transformStateWithClones(state, actions) {
  const current = { ...state };
  const resultingArray = [];

  for (const key in actions) {
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(current, actions[key].extraData);
        break;

      case 'removeProperties':
        for (const property of actions[key].keysToRemove) {
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

    resultingArray[key] = { ...current };
  }

  return resultingArray;
}

module.exports = transformStateWithClones;


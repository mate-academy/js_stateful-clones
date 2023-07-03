'use strict';

function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        continue;
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;

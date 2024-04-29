'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let state2 = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(state2, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete state2[key];
        }
        break;

      case 'clear':
        state2 = {};
        break;
      default:
        return `Unknown action: ${action.type}`;
    }

    arr.push({ ...state2 });
  }

  return arr;
}

module.exports = transformStateWithClones;

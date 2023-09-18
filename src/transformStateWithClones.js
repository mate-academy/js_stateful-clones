'use strict';

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties' :
        for (const add in actions[i].extraData) {
          newState[add] = actions[i].extraData[add];
        }
        break;

      case 'removeProperties' :
        for (let j = 0;
          j < actions[i].keysToRemove.length; j++) {
          delete newState[actions[i].keysToRemove[j]];
        }
        break;

      case 'clear' :
        for (const element in newState) {
          delete newState[element];
        }
        break;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;

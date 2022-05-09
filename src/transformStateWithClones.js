'use strict';

function transformStateWithClones(state, actions) {
  const current = { ...state };
  const resultingArray = [];

  for (let i = 0; i < actions.length; i++) {
    
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        current[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in actions[i].keysToRemove) {
        delete current[actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in current) {
        delete current[key];
      }
    }

    resultingArray[i] = { ...current };
  }

  return resultingArray;
}

module.exports = transformStateWithClones;

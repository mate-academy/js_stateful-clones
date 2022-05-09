'use strict';

function transformStateWithClones(state, actions) {
  const current = { ...state };
  const resultingArray = [];
  let newr;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const prop in actions[i].extraData) {
        current[prop] = actions[i].extraData[prop];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const word in actions[i].keysToRemove) {
        delete current[actions[i].keysToRemove[word]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in current) {
        delete current[key];
      }
    } newr = { ...current }; resultingArray[i] = newr;
  }

  return resultingArray;
}

module.exports = transformStateWithClones;

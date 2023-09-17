'use strict';

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const masiv = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const add in actions[i].extraData) {
        newState[add] = actions[i].extraData[add];
      }
      masiv.push({ ...newState });
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0;
        j < actions[i].keysToRemove.length; j++) {
        delete newState[actions[i].keysToRemove[j]];
      }
      masiv.push({ ...newState });
    }

    if (actions[i].type === 'clear') {
      for (const element in newState) {
        delete newState[element];
      }
      masiv.push({ ...newState });
    }
  }

  return masiv;
}

module.exports = transformStateWithClones;

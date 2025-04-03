'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const nobyt = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      newState = Object.assign(newState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (let i2 = 0; i2 < actions[i].keysToRemove.length; i2++) {
        const val = actions[i].keysToRemove[i2];

        delete newState[val];
      }
    }

    if (actions[i].type === 'clear') {
      newState = {};
    }

    nobyt.push(newState);
  }

  return nobyt;
}
module.exports = transformStateWithClones;

/*
   if (actions[i].type === 'addProperties') {
      if (Object.keys(actions).length === 0) {
        newState = Object.assign(newState, {}, actions[i].extraData);
      } else {
        newState = Object.assign(newState, {}, state, actions[i].extraData);
      }
    }

*/

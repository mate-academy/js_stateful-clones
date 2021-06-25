'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const nawState = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(nawState, actions[i].extraData);
      arr.push({ ...nawState });
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete nawState[key];
      }
      arr.push({ ...nawState });
    }

    if (actions[i].type === 'clear') {
      for (const key in nawState) {
        delete nawState[key];
      }
      arr.push({ ...nawState });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

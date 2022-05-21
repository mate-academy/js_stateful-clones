'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const logArray = [];
  const newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      logArray.push({ ...newState });
      continue;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      logArray.push({ ...newState });
      continue;
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }

      logArray.push({});
      continue;
    }
  }

  return logArray;
}

module.exports = transformStateWithClones;

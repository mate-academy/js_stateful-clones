'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *git
 * @return {Object[]}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function transformStateWithClones(state, actions) {
  const newState = deepClone(state);
  const stateHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(newState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (let i = 0; i < obj.keysToRemove.length; i++) {
        delete newState[obj.keysToRemove[i]];
      }
    }

    if (obj.type === 'clear') {
      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
    }

    stateHistory.push(deepClone(newState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

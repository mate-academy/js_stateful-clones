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
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newState, obj.extraData);
        break;
      case 'removeProperties':
        for (let i = 0; i < obj.keysToRemove.length; i++) {
          delete newState[obj.keysToRemove[i]];
        }
        break;
      case 'clear':
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;
      default:
        break;
    }

    stateHistory.push(deepClone(newState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

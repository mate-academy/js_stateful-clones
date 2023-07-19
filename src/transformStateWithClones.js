'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  let pushObj;
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete newState[actions[i].keysToRemove[j]];
        }
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      case 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        pushObj = { ...newState };
        result.push(pushObj);
        break;
      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;

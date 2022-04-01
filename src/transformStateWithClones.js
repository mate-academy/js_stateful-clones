'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanged = { ...state };
  let copyObj = {};
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateChanged[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (let item = 0; item < actions[i].keysToRemove.length; item++) {
          delete stateChanged[actions[i].keysToRemove[item]];
        }
        break;
      case 'clear':
        for (const item in stateChanged) {
          delete stateChanged[item];
        }
        break;
      default:
        return null;
    }

    copyObj = { ...stateChanged };
    result.push(copyObj);
  }

  return result;
}

module.exports = transformStateWithClones;

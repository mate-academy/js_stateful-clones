'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          newState[key] = actions[i].extraData[key];
        };
        break;

      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete newState[actions[i].keysToRemove[y]];
        };
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;

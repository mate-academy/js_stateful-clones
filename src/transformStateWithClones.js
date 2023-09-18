'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const changesArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateCopy[key] = actions[i].extraData[key];
        };
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete stateCopy[actions[i].keysToRemove[j]];
        };
        break;

      case 'clear':
        for (const lock in stateCopy) {
          delete stateCopy[lock];
        };
        break;
      default:
        throw new Error('invalid action type');
    }

    changesArray.push({ ...stateCopy });
  }

  return changesArray;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statefulClone = {
    ...state,
  };
  const statefulCloneHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          statefulClone[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete statefulClone[actions[i].keysToRemove[y]];
        }
        break;

      case 'clear':
        if (Object.keys(state).length !== 0) {
          for (const key in statefulClone) {
            delete statefulClone[key];
          }
        }
        break;
    }

    statefulCloneHistory.push({
      ...statefulClone,
    });
  }

  return statefulCloneHistory;
}

module.exports = transformStateWithClones;

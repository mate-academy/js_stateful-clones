'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneHistory = [];
  let newClone = {
    ...state,
  };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newClone = Object.assign(newClone, action.extraData);

      cloneHistory.push({ ...newClone });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newClone[key];
      }

      cloneHistory.push({ ...newClone });
    }

    if (action.type === 'clear') {
      for (const key in newClone) {
        delete newClone[key];
      }

      cloneHistory.push({ ...newClone });
    }
  }

  return cloneHistory;
}

module.exports = transformStateWithClones;

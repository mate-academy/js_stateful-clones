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
    switch (action.type) {
      case 'addProperties':
        newClone = Object.assign(newClone, action.extraData);

        cloneHistory.push({ ...newClone });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newClone[key];
        }

        cloneHistory.push({ ...newClone });

        break;

      case 'clear':
        for (const key in newClone) {
          delete newClone[key];
        }

        cloneHistory.push({ ...newClone });
    }
  }

  return cloneHistory;
}

module.exports = transformStateWithClones;

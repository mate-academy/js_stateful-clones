'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneHistory = [];
  const stateModified = {
    ...state,
  };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateModified, { ...action.extraData });
      stateCloneHistory.push({ ...stateModified });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateModified[key];
      }
      stateCloneHistory.push({ ...stateModified });
    }

    if (action.type === 'clear') {
      for (const key in stateModified) {
        delete stateModified[key];
      }
      stateCloneHistory.push({ ...stateModified });
    } // else {
    // stateCloneHistory.push({...stateModified});
    //

    // }
  }

  return stateCloneHistory;
}

module.exports = transformStateWithClones;

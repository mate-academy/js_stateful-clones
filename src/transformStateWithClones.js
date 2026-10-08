'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const workingCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(workingCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete workingCopy[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in workingCopy) {
        delete workingCopy[key];
      }
    }
    stateHistory.push({ ...workingCopy });
  }

  return stateHistory;
}

// 3. the same three ifs as before,
//    but changing the working copy, not state

// 4. take a photo: put a copy of the working copy into the album

// 5. give back the album

module.exports = transformStateWithClones;

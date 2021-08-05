'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const changeListArray = [];

  for (const key of actions) {
    switch (key.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, key.extraData);
        break;

      case 'removeProperties':
        for (const arr of key.keysToRemove) {
          if (arr in newState) {
            delete newState[arr];
          }
        }
    }
    changeListArray.push({ ...newState });
  }

  return changeListArray;
}

module.exports = transformStateWithClones;

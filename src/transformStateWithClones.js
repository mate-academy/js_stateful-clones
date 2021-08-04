'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changeList = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyArr of action.keysToRemove) {
          if (newState.hasOwnProperty(keyArr)) {
            delete newState[keyArr];
          }
        }
        break;

      case 'clear':
        newState = {};
    }

    changeList.push({ ...newState });
  }

  return changeList;
}

module.exports = transformStateWithClones;

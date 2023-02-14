'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const changeHistoryArray = [];

  for (const action of actions) {
    switch (action.type) {
      case '':
        return '';
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
    }

    changeHistoryArray.push({ ...stateClone });
  }

  return changeHistoryArray;
}

module.exports = transformStateWithClones;

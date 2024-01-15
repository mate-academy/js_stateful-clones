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

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
    }
    changeListArray.push({ ...newState });
  }

  return changeListArray;
}

module.exports = transformStateWithClones;

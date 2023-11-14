'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        newArray.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        newArray.push({ ...copyState });
        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }
        newArray.push({ ...copyState });
        break;
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;

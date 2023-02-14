'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const del in copyState) {
          delete copyState[del];
        }
        newArray.push({ ...copyState });
        break;

      case 'addProperties':
        Object.assign(copyState, action.extraData);
        newArray.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        newArray.push({ ...copyState });
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;

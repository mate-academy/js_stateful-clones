'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newAArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties' :
        for (const type of action.keysToRemove) {
          delete newState[type];
        }
        break;

      case 'clear' :
        for (const del in newState) {
          delete newState[del];
        }
        break;
    }
    newAArr.push({ ...newState });
  }

  return newAArr;
}

module.exports = transformStateWithClones;

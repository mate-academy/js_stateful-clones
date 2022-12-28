'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear' :
        Object.keys(newState).forEach(key => delete newState[key]);
        break;
      case 'addProperties' :
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties' :
        for (const property of action.keysToRemove) {
          delete newState[property];
        }
        break;
      default:
        break;
    }
    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;

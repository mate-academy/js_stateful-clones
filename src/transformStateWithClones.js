'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete newState[item];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;

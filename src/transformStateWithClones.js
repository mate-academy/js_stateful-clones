'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function removeProperties(obj, toRemoveArray) {
  for (const item of toRemoveArray) {
    delete obj[item];
  }
}

function clearObj(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(clonedState, action.keysToRemove);
        break;

      case 'clear':
        clearObj(clonedState);
        break;

      default:
        throw new Error('wrong action type');
    }

    stateArr.push({ ...clonedState });
  }

  return stateArr;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const prop in copyState) {
          delete copyState[prop];
        }
        break;

      default:
        break;
    }

    newArr.push({ ...copyState });
  }

  return newArr;
}

module.exports = transformStateWithClones;

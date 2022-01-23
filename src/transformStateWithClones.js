'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyForDelete of action.keysToRemove) {
          delete copyState[keyForDelete];
        }
        break;

      case 'clear':
        for (const keyOfState in copyState) {
          delete copyState[keyOfState];
        }
        break;

      default:
        break;
    }

    resultArray.push(copyState);
    copyState = Object.assign({}, copyState);
  }

  return resultArray;
}

module.exports = transformStateWithClones;

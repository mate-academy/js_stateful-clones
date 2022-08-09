'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = Object.assign({}, state);
  const finallResult = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyState[key];
        };
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        };
        break;
      default:
        throw new Error('Please, enter valid type!!!');
    }
    finallResult.push(Object.assign({}, copyState));
  }

  return finallResult;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const num in copy) {
          delete copy[num];
        };
        break;

      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;

      default:
        throw new Error('Unsupported action type');
    }
    newArr.push({ ...copy });
  }

  return newArr;
}

module.exports = transformStateWithClones;

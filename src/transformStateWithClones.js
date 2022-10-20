'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const copyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const props of action.keysToRemove) {
          delete copy[props];
        };
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default:
        break;
    }
    copyArray.push({ ...copy });
  }

  return copyArray;
}

module.exports = transformStateWithClones;

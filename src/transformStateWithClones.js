'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const clonesArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        }
        break;

      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete clone[keyToRemove];
        }
        break;

      default:
        continue;
    }
    clonesArr.push({ ...clone });
  }

  return clonesArr;
}

module.exports = transformStateWithClones;

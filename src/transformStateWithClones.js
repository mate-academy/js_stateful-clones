'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = {};
  const resultArray = [];

  for (const key in state) {
    clone[key] = state[key];
  }

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const temp of action.keysToRemove) {
          if (clone.hasOwnProperty(temp)) {
            delete clone[temp];
          }
        }
        break;

      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        };
        break;

      default:
    }
    resultArray.push({ ...clone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;

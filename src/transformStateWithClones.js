'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const clone = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const propsToAdd = Object.entries(action.extraData);

        for (const [key, value] of propsToAdd) {
          clone[key] = value;
        }
        arr.push({ ...clone });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        arr.push({ ...clone });
        break;

      case 'clear':
        const stateKeys = Object.keys(clone);

        for (const key of stateKeys) {
          delete clone[key];
        }
        arr.push({ ...clone });
        break;

      default:
        return -1;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

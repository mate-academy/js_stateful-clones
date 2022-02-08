'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = Array(0);
  let temp = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        temp = {};
        break;
      case 'removeProperties':
        Object
          .values(action.keysToRemove)
          .forEach(K => delete temp[K]);
        break;

      default:
        for (const [K, V] of Object.entries(action.extraData)) {
          temp[K] = V;
        }
    }

    arr.push({ ...temp });
  }

  return arr;
}

module.exports = transformStateWithClones;

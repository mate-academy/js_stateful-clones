'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const obj in action.extraData) {
          copy[obj] = action.extraData[obj];
        }
        break;
      case 'removeProperties':
        for (const obj of action.keysToRemove) {
          delete copy[obj];
        }
        break;
      case 'clear':
        for (const obj in copy) {
          delete copy[obj];
        }
        break;
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
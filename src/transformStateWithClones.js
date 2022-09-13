'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  // Main Loop:
  for (const action of actions) {
    switch (action['type']) {
      // For the type of 'addProperties':
      case 'addProperties':
        Object.assign(clone, action['extraData']);
        break;

      // For the type of 'removeProperties':
      case 'removeProperties':
        for (const delItem of action['keysToRemove']) {
          delete clone[delItem];
        }
        break;

      // For the type of 'clear':
      case 'clear':
        for (const delAllItem in clone) {
          delete clone[delAllItem];
        }
        break;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;

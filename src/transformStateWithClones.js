'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneShadow = {};
  const clone = {};
  const result = [];

  Object.assign(clone, state);

  // Main Loop:
  for (const action of actions) {
    cloneShadow = {};

    switch (action['type']) {
      // For the type of 'addProperties':
      case 'addProperties':
        for (const extraItem in action['extraData']) {
          clone[extraItem] = action['extraData'][extraItem];
        }
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

    result.push(Object.assign(cloneShadow, clone));
  }

  return result;
}

module.exports = transformStateWithClones;

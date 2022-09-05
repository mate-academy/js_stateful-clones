'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let shadow = {};
  const clone = {};
  const res = [];

  Object.assign(clone, state);

  // Main Loop:
  for (const action of actions) {
    shadow = {};

    // For the type of 'addProperties':
    if (action['type'] === 'addProperties') {
      for (const extraItem in action['extraData']) {
        clone[extraItem] = action['extraData'][extraItem];
      }
      // For the type of 'removeProperties':
    } else if (action['type'] === 'removeProperties') {
      for (const delItem of action['keysToRemove']) {
        delete clone[delItem];
      }
      // For the type of 'clear':
    } else if (action['type'] === 'clear') {
      for (const delAllItem in clone) {
        delete clone[delAllItem];
      }
    }

    res.push(Object.assign(shadow, clone));
  }

  return res;
}

module.exports = transformStateWithClones;

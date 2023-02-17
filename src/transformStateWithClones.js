'use strict';

/**
 * @param {Object} clone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformcloneWithClones(state, actions) {
  const arr = [];
  const clone = Object.assign({}, state);

  for (const actionKey of actions) {
    switch (actionKey.type) {
      case 'addProperties':
        Object.assign(clone, actionKey.extraData);

        break;

      case 'removeProperties' :
        for (const prop of actionKey.keysToRemove) {
          delete clone[prop];
        }
        break;

      case 'clear':
        for (const cloneKey in clone) {
          delete clone[cloneKey];
        }
        break;
    }
    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformcloneWithClones;

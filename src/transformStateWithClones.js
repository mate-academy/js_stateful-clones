'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectClone = {};
  const stateArr = [];

  Object.assign(objectClone, state);

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(objectClone, key.extraData);
        break;
      case 'clear':
        for (const k in objectClone) {
          delete objectClone[k];
        }
        break;
      case 'removeProperties':
        for (const keys of key.keysToRemove) {
          delete objectClone[keys];
        }
        break;
    }
    stateArr.push({ ...objectClone });
  }

  return stateArr;
}

module.exports = transformStateWithClones;

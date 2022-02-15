'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const array = [];

  function arrayPush() {
    array.push({ ...copyState });
  }

  for (const keys of actions) {
    switch (keys.type) {
      case 'addProperties':
        Object.assign(copyState, keys.extraData);
        arrayPush();
        break;

      case 'removeProperties':
        for (const key of keys.keysToRemove) {
          delete copyState[key];
        }
        arrayPush();
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        arrayPush();
        break;
    }
  }

  return array;
}

module.exports = transformStateWithClones;

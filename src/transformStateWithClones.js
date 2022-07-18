'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = {};
  const arr = [];

  for (const key in state) {
    copy[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const aType = actions[i].type;
    const aExtra = actions[i].extraData;
    const aKeysToRemove = actions[i].keysToRemove;

    switch (aType) {
      case 'addProperties':
        Object.assign(copy, aExtra);
        break;

      case 'removeProperties':
        for (let x = 0; x < aKeysToRemove.length; x++) {
          delete copy[aKeysToRemove[x]];
        };
        break;

      default:
        for (const key in copy) {
          delete copy[key];
        };
        break;
    }

    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;

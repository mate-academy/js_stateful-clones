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
    const typeKey = actions[i].type;
    const extraDataKey = actions[i].extraData;
    const removeKeys = actions[i].keysToRemove;

    switch (typeKey) {
      case 'addProperties':
        Object.assign(copy, extraDataKey);
        break;

      case 'removeProperties':
        for (let x = 0; x < removeKeys.length; x++) {
          delete copy[removeKeys[x]];
        };
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        };
        break;

      default:
        break;
    }

    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;

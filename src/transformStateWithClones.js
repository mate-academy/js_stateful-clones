'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clear = 'clear';
  const add = 'addProperties';
  const remove = 'removeProperties';
  const arr = [];
  const copy = {};

  Object.assign(copy, state);
  arr.push(copy);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === clear) {
      for (const ch in arr[i]) {
        delete arr[i][ch];
      }
    } else if (actions[i].type === add) {
      for (const jey in actions[i].extraData) {
        arr[i][jey] = actions[i].extraData[jey];
      }
    } else if (actions[i].type === remove) {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        for (const ch in arr[i]) {
          if (ch === actions[i].keysToRemove[j]) {
            delete arr[i][ch];
          }
        }
      }
    }

    if (actions[i + 1]) {
      const object = {};

      Object.assign(object, arr[i]);
      arr.push(object);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;

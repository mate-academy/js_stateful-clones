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
  const result = [];
  const stateClones = {};

  Object.assign(stateClones, state);
  result.push(stateClones);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case clear:
        for (const ch in result[i]) {
          delete result[i][ch];
        }
        break;

      case add:
        for (const jey in actions[i].extraData) {
          result[i][jey] = actions[i].extraData[jey];
        }
        break;

      case remove:
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          for (const ch in result[i]) {
            if (ch === actions[i].keysToRemove[j]) {
              delete result[i][ch];
            }
          }
        }
        break;
    }

    if (actions[i + 1]) {
      const object = {};

      Object.assign(object, result[i]);
      result.push(object);
    }
  }

  return result;
}

module.exports = transformStateWithClones;

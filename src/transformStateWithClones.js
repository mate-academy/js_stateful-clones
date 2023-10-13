'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newArrayObject = [Object.assign({}, state)]; // масив об'єктів

  for (let i = 0; i < actions.length; i++) {
    if (i > 0) {
      newArrayObject[i] = { ...newArrayObject[i - 1] };
    }

    switch (actions[i].type) {
      case 'addProperties': {
        for (const key1 in actions[i].extraData) {
          newArrayObject[i][`${key1}`] = actions[i].extraData[key1];
        }

        break;
      }

      case 'removeProperties': {
        for (const key2 in actions[i].keysToRemove) {
          delete newArrayObject[i][`${actions[i].keysToRemove[key2]}`];
        }

        break;
      }

      case 'clear': {
        for (const key3 in newArrayObject[i]) {
          delete newArrayObject[i][`${key3}`];
        }

        break;
      }
    }
  }

  return newArrayObject;
}

module.exports = transformStateWithClones;

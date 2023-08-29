'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arr = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    stateCopy = { ...stateCopy };

    switch (actions[i].type) {
      case 'addProperties': {
        for (const key in actions[i].extraData) {
          stateCopy[key] = actions[i].extraData[key];
        }

        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case 'clear': {
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        break;
      }
    }
    arr.push(stateCopy);
  }

  return arr;
}

module.exports = transformStateWithClones;

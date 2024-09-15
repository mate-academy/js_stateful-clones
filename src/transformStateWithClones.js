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

  for (const action of actions) {
    stateCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties': {
        stateCopy = Object.assign(stateCopy, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case 'clear': {
        stateCopy = {};

        break;
      }
    }
    arr.push(stateCopy);
  }

  return arr;
}

module.exports = transformStateWithClones;

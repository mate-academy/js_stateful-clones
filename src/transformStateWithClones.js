'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const array = [];
  const StateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          StateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete StateCopy[key];
        }
        break;

      case 'clear':
        for (const key in StateCopy) {
          delete StateCopy[key];
        }
        break;
    }
    array.push(Object.assign({}, StateCopy));
  }

  return array;
}

module.exports = transformStateWithClones;

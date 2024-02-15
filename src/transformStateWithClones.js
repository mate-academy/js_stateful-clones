'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let objectCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        objectCopy = {};
        break;

      case 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case 'removeProperties': {
        for (const char of action.keysToRemove) {
          delete objectCopy[char];
        }
        break;
      }

      default: throw new Error();
    };

    stateHistory.push({ ...objectCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const changesState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copy[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    changesState.push({ ...copy });
  }

  return changesState;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = Object.assign({}, state);
  const historyState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }
    historyState.push({ ...copyState });
  }

  return historyState;
}

module.exports = transformStateWithClones;

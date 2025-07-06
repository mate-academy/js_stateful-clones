'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let modifiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        modifiedState = { ...modifiedState, ...action.extraData };
        break;

      case 'removeProperties': {
        modifiedState = { ...modifiedState };

        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;
      }

      case 'clear':
        modifiedState = {};
        break;
    }
    allStates.push(modifiedState);
  }

  return allStates;
}

module.exports = transformStateWithClones;

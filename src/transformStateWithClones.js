'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = {
    ...state,
  };
  const changedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        return 'Undefined type of action: ' + action.type;
    }

    changedStates.push({
      ...currentState,
    });
  }

  return changedStates;
}

module.exports = transformStateWithClones;

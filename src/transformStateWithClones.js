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

        changedStates.push({
          ...currentState,
        });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }

        changedStates.push({
          ...currentState,
        });
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }

        changedStates.push({
          ...currentState,
        });
        break;

      default:
        return 'Undefined type of action: ' + action.type;
    }
  }

  return changedStates;
}

module.exports = transformStateWithClones;

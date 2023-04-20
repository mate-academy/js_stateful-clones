'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const historyOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }
        break;

      case 'clear':
        Object.keys(currentState).forEach(key => {
          delete currentState[key];
        });
        break;

      default:
        throw new Error('Invalid type of action');
    };

    historyOfState.push({ ...currentState });
  }

  return historyOfState;
}

module.exports = transformStateWithClones;

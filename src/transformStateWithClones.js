'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = state;

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear': {
        nextState = {};
        break;
      }

      case 'addProperties': {
        const extraData = action.extraData || {};

        nextState = {
          ...prevState,
          ...extraData,
        };
        break;
      }

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove || [];
        const stateCopy = { ...prevState };

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        nextState = stateCopy;
        break;
      }

      default: {
        throw new Error('Unknown action type: ' + action.type);
      }
    }

    stateHistory.push(nextState);
    prevState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

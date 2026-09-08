'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = stateCopy;
    stateHistory.push(stateCopy);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;

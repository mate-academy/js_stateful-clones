'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  actions.forEach(({ type, extraData, keysToRemove }) => {
    let nextState = { ...currentState };

    switch (type) {
      case 'addProperties':
        Object.assign(nextState, extraData);
        break;

      case 'removeProperties':
        if (keysToRemove) {
          keysToRemove.forEach((key) => {
            if (nextState.hasOwnProperty(key)) {
              delete nextState[key];
            }
          });
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        // Handle unknown action types, if needed
        break;
    }

    result.push(nextState);
    currentState = nextState;
  });

  return result;
}

module.exports = transformStateWithClones;

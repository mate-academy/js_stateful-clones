'use strict';

function transformStateWithClones(state, actions) {
  if (!Array.isArray(actions)) {
    return [];
  }

  return actions.reduce((results, action) => {
    // Create a fresh clone of the current state
    const currentState = { ...(results[results.length - 1] || state) };

    // Apply the action
    const newState = (() => {
      switch (action.type) {
        case 'addProperties':
          return {
            ...currentState,
            ...(action.extraData || {}),
          };

        case 'removeProperties':
          if (!action.keysToRemove?.length) {
            return currentState;
          }

          const stateAfterRemoval = { ...currentState };

          action.keysToRemove.forEach((key) => {
            delete stateAfterRemoval[key];
          });

          return stateAfterRemoval;

        case 'clear':
          return {};

        default:
          return currentState;
      }
    })();

    // Add the new state to results
    return [...results, newState];
  }, []);
}

module.exports = transformStateWithClones;

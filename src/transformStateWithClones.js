'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        if (
          typeof action.extraData === 'object' &&
          action.extraData !== null &&
          action.extraData.constructor === Object
        ) {
          newState = {
            ...currentState,
            ...action.extraData,
          };
        } else {
          newState = { ...currentState };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          const keysSet = new Set(action.keysToRemove);

          newState = Object.entries(currentState).reduce(
            (acc, [key, value]) => {
              if (!keysSet.has(key)) {
                acc[key] = value;
              }
              return acc;
            },
            {}
          );
        } else {
          newState = { ...currentState };
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;


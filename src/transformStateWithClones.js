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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = Object.fromEntries(
          Object.entries(newState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        newState = {};
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

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

  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(newState);
    currentState = newState;
  });

  return history;
}

module.exports = transformStateWithClones;

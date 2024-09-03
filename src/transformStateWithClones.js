'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
      default:
        break;
    }

    result.push(newState);
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;

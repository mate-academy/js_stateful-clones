'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function cloneState(state) {
  return { ...state };
}

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = cloneState(state);

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;
    let newState;

    switch (type) {
      case 'addProperties':
        newState = {
          ...currentState, ...extraData,
        };
        break;
      case 'removeProperties':
        newState = { ...currentState };

        keysToRemove.forEach(key => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
      case 'clear':
        newState = {};
        break;
      default:
        newState = currentState;
        break;
    }

    result.push(newState);
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;

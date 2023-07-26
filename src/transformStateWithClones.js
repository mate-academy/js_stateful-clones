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

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        keysToRemove.forEach(key => {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        });
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }

    result.push(cloneState(currentState));
  });

  return result;
}

module.exports = transformStateWithClones;

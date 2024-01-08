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

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties': {
        newState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      }

      case 'removeProperties': {
        const copy = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete copy[key];
        });

        newState = { ...copy };
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default: {
        newState = { ...currentState };
      }
    }

    result.push(newState);
    currentState = { ...newState };
  }

  return result;
}

module.exports = transformStateWithClones;

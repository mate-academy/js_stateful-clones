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
    switch (action.type) {
      case 'clear': {
        const newState = {};

        result.push(newState);
        currentState = newState;
        break;
      }

      case 'addProperties': {
        const newState = {
          ...currentState,
          ...action.extraData,
        };

        result.push(newState);
        currentState = newState;
        break;
      }

      case 'removeProperties': {
        const newState = {
          ...currentState,
        };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push(newState);
        currentState = newState;
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;

'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties': {
        newState = { ...prevState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        newState = { ...prevState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    result.push(newState);
    prevState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

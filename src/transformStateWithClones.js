'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const result = [];

  for (const action of actions) {
    let newState = { ...prevState };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(newState, action.extraData);

        prevState = newState;
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        prevState = newState;
        break;
      }

      case 'clear':
        prevState = {};
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }
    result.push({ ...prevState });
  }

  return result;
}

module.exports = transformStateWithClones;

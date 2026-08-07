'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrState = [];

  for (const action of actions) {
    const { type } = action;

    newState = { ...newState };

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          newState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    arrState.push(newState);
  }

  return arrState;
}

module.exports = transformStateWithClones;

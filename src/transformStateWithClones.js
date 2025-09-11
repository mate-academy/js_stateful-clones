'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let previousState = { ...state };
  const stateArray = [];

  for (const action of actions) {
    let stateCopy = { ...previousState };

    switch (action.type) {
      case 'addProperties':
        for (const key of Object.keys(action.extraData || {})) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];

        for (const key of keys) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateArray.push(stateCopy);
    previousState = stateCopy;
  }

  return stateArray;
}

module.exports = transformStateWithClones;

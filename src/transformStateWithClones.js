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
    let stateCopy;

    switch (action.type) {
      case 'addProperties':
        if (
          !action ||
          typeof action.extraData !== 'object' ||
          action.extraData === null ||
          Array.isArray(action.extraData)
        ) {
          stateCopy = { ...currentState };
          break;
        }
        stateCopy = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          stateCopy = { ...currentState };
          break;
        }
        stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        stateCopy = { ...currentState };
        break;
    }

    currentState = stateCopy;
    result.push(currentState);
  }

  return result;
}
module.exports = transformStateWithClones;

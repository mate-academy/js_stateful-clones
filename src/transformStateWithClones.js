'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          stateCopy = { ...stateCopy, ...action.extraData };
        }
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    newArray.push({ ...stateCopy });
  }

  return newArray;
}

module.exports = transformStateWithClones;

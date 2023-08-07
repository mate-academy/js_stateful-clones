'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy };

        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          stateCopy = { ...stateCopy };

          for (const key of action.keysToRemove) {
            if (stateCopy.hasOwnProperty(key)) {
              delete stateCopy[key];
            }
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;

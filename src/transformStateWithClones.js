'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newObject[key] = action.extraData[key];
        }
        newObject = { ...newObject };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObject[key];
        }
        newObject = { ...newObject };
        break;

      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }
        newObject = { ...newObject };
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...newObject });
  }

  return result;
}

module.exports = transformStateWithClones;
